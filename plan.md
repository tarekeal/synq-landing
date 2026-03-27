# F1 Implementation Plan: Database Models, Async Engine, Alembic Migrations

## Summary

**What we're building:**
The foundational database layer for the Synq backend. This means scaffolding the Python backend directory, configuring a SQLAlchemy 2.x async engine, defining the `User` and `Note` ORM models, and wiring Alembic for schema versioning. No application logic (auth, CRUD) is included — this is purely the persistence foundation that F2 (Auth API) and F3 (Notes API) will build on.

**Why:**
F2 and F3 both import from this layer. Getting the models, engine configuration, and migration workflow correct upfront prevents schema drift and makes subsequent features straightforward. Async SQLAlchemy is non-negotiable because FastAPI is async-first.

**Scope boundary:**
- ✅ `backend/` directory scaffold
- ✅ `pyproject.toml` with all F1 dependencies
- ✅ SQLAlchemy 2.x async engine + session factory
- ✅ `User` and `Note` ORM models (UUID PKs, UTC timestamps)
- ✅ Alembic init + `env.py` wired to async engine
- ✅ First migration: `0001_initial_schema`
- ✅ `.env.example` with `DATABASE_URL`
- ✅ Unit tests for model creation and relationships
- ❌ FastAPI app setup (F2)
- ❌ Auth endpoints (F2)
- ❌ Notes endpoints (F3)

---

## Tasks

### Task 1 — Scaffold backend directory and pyproject.toml

**Goal:** Create the `backend/` package with all F1 dependencies declared.

**Acceptance criteria:**
- `backend/pyproject.toml` exists with `[project]` metadata
- Dependencies include: `fastapi`, `sqlalchemy[asyncio]>=2.0`, `asyncpg`, `alembic`, `pydantic-settings`, `python-dotenv`
- Dev dependencies include: `pytest`, `pytest-asyncio`, `httpx`, `pytest-postgresql` (or `sqlalchemy` test utilities)
- `backend/app/__init__.py` exists (empty, marks package)
- Running `pip install -e backend/` succeeds

**Files to create:**
```
backend/
├── pyproject.toml
├── .env.example
└── app/
    └── __init__.py
```

---

### Task 2 — Settings and database configuration

**Goal:** Centralise all config via `pydantic-settings` and create the async engine + session factory.

**Acceptance criteria:**
- `Settings` class reads `DATABASE_URL` from environment (falls back to `.env`)
- `create_async_engine` is called once at module level with the settings URL
- `async_session_factory` (or `AsyncSessionLocal`) is exported
- `get_db()` async generator dependency is exported (yields a session, rolls back on error, closes on exit)
- Module can be imported without a live database (engine is lazy)

**Files to create:**
```
backend/app/
├── config.py      # pydantic-settings Settings class
└── database.py    # engine, session factory, get_db dependency
```

---

### Task 3 — Declarative base and shared mixins

**Goal:** Define the `Base` all models will inherit from, plus a `TimestampMixin` for `created_at`/`updated_at`.

**Acceptance criteria:**
- `Base` is a `DeclarativeBase` subclass (SQLAlchemy 2.x style, NOT `declarative_base()`)
- `TimestampMixin` adds:
  - `created_at: Mapped[datetime]` — `server_default=func.now()`, timezone-aware
  - `updated_at: Mapped[datetime]` — `server_default=func.now()`, `onupdate=func.now()`
- All timestamps stored in UTC (using `TIMESTAMP(timezone=True)`)
- No foreign keys or application logic in this file

**Files to create:**
```
backend/app/models/
├── __init__.py    # re-exports Base, User, Note
└── base.py        # DeclarativeBase + TimestampMixin
```

---

### Task 4 — User model

**Goal:** Define the `User` ORM model.

**Acceptance criteria:**
- `id`: `Mapped[uuid.UUID]`, primary key, `default=uuid.uuid4`, server default via `gen_random_uuid()`
- `email`: `Mapped[str]`, `unique=True`, `nullable=False`, indexed
- `hashed_password`: `Mapped[str]`, `nullable=False`
- `display_name`: `Mapped[str]`, `nullable=False`
- Inherits `TimestampMixin` (created_at, updated_at)
- `notes` relationship: `Mapped[list["Note"]]`, `back_populates="user"`, `cascade="all, delete-orphan"`
- `__tablename__ = "users"`
- `__repr__` returns `<User id=... email=...>`

**Files to create:**
```
backend/app/models/user.py
```

---

### Task 5 — Note model

**Goal:** Define the `Note` ORM model.

**Acceptance criteria:**
- `id`: `Mapped[uuid.UUID]`, primary key, `default=uuid.uuid4`
- `title`: `Mapped[str]`, `nullable=False`
- `content`: `Mapped[str | None]` (TEXT column, nullable)
- `user_id`: `Mapped[uuid.UUID]`, `ForeignKey("users.id", ondelete="CASCADE")`, indexed
- `user` relationship: `Mapped["User"]`, `back_populates="notes"`
- Inherits `TimestampMixin`
- `__tablename__ = "notes"`
- Index on `(user_id, updated_at DESC)` for paginated listing queries

**Files to create:**
```
backend/app/models/note.py
```

---

### Task 6 — Wire Alembic

**Goal:** Initialise Alembic and configure `env.py` to use the async engine.

**Acceptance criteria:**
- `alembic.ini` at `backend/` root with `script_location = alembic`
- `alembic/env.py` imports `Base.metadata` from `app.models` — so Alembic sees all tables
- Async migration support via `run_async_migrations()` using `AsyncEngine`
- `sqlalchemy.url` in `alembic.ini` is a placeholder; real URL comes from `Settings` at runtime
- `alembic revision --autogenerate` produces a valid migration when run against a live DB

**Files to create:**
```
backend/
├── alembic.ini
└── alembic/
    ├── env.py
    ├── script.py.mako
    └── versions/
        └── .gitkeep
```

---

### Task 7 — First migration: `0001_initial_schema`

**Goal:** Generate and commit the initial Alembic migration that creates `users` and `notes` tables.

**Acceptance criteria:**
- Migration file exists at `alembic/versions/0001_initial_schema.py`
- `upgrade()` creates `users` then `notes` (FK ordering respected)
- `downgrade()` drops `notes` then `users`
- Migration uses `op.create_index` for email uniqueness, user_id FK, and `(user_id, updated_at)` composite
- Running `alembic upgrade head` on a blank database succeeds
- Running `alembic downgrade base` cleanly removes both tables

**Files to create:**
```
backend/alembic/versions/0001_initial_schema.py
```

---

### Task 8 — Tests

**Goal:** Verify models and engine wiring work correctly in isolation.

**Acceptance criteria:**
- `conftest.py` spins up an in-memory SQLite (async) or test PostgreSQL DB, creates tables, yields a session, drops tables after each test
- `test_models.py`:
  - `test_user_creation` — insert a User, query it back, assert fields match
  - `test_note_creation` — insert a User + Note, assert FK relationship
  - `test_user_notes_cascade` — delete User, assert Note is cascade-deleted
  - `test_timestamps_auto` — created_at and updated_at are set on insert
- All tests pass with `pytest backend/tests/`

**Files to create:**
```
backend/tests/
├── __init__.py
├── conftest.py
└── test_models.py
```

---

## Testing Strategy

| Task | Test type | Tool | What to assert |
|------|-----------|------|----------------|
| T1 (scaffold) | Smoke | `pip install` | Package installs without errors |
| T2 (database.py) | Unit | pytest-asyncio | `get_db()` yields a session; session rolls back on exception |
| T3 (base.py) | Unit | pytest-asyncio | `TimestampMixin` fields are populated on insert |
| T4 (User) | Integration | pytest-asyncio + SQLite async | Round-trip insert/select; unique email constraint; repr |
| T5 (Note) | Integration | pytest-asyncio + SQLite async | Round-trip; cascade delete; nullable content |
| T6 (Alembic env) | Smoke | `alembic check` | No pending autogenerate diffs against live DB |
| T7 (Migration) | Integration | `alembic upgrade + downgrade` | Both directions succeed against real PostgreSQL |
| T8 (test suite) | All above | `pytest backend/` | All green, no warnings |

**Test database strategy:**
Use `aiosqlite` for fast unit tests (no Docker required). Use a real PostgreSQL instance (via Docker Compose or `pytest-postgresql`) only for migration round-trip tests (T7). This keeps the test suite runnable in CI without a live Postgres instance for the model unit tests.

**Known limitation:** SQLite does not enforce foreign key constraints by default; enable with `PRAGMA foreign_keys = ON` in the async connection event listener in `conftest.py`.

---

## File Changes

### New files (grouped by task)

**Task 1 — Scaffold**
| File | Purpose |
|------|---------|
| `backend/pyproject.toml` | Package metadata + dependencies |
| `backend/.env.example` | Documents required env vars |
| `backend/app/__init__.py` | Package marker |

**Task 2 — Config + DB**
| File | Purpose |
|------|---------|
| `backend/app/config.py` | `Settings` class via pydantic-settings |
| `backend/app/database.py` | Async engine, session factory, `get_db` dependency |

**Task 3 — Base**
| File | Purpose |
|------|---------|
| `backend/app/models/__init__.py` | Re-exports `Base`, `User`, `Note` |
| `backend/app/models/base.py` | `Base` (DeclarativeBase) + `TimestampMixin` |

**Task 4 — User model**
| File | Purpose |
|------|---------|
| `backend/app/models/user.py` | `User` ORM model |

**Task 5 — Note model**
| File | Purpose |
|------|---------|
| `backend/app/models/note.py` | `Note` ORM model |

**Task 6 — Alembic wiring**
| File | Purpose |
|------|---------|
| `backend/alembic.ini` | Alembic config (script_location, db url placeholder) |
| `backend/alembic/env.py` | Async migration runner wired to `Base.metadata` |
| `backend/alembic/script.py.mako` | Migration file template |
| `backend/alembic/versions/.gitkeep` | Ensures directory is tracked |

**Task 7 — First migration**
| File | Purpose |
|------|---------|
| `backend/alembic/versions/0001_initial_schema.py` | Creates `users` + `notes` tables |

**Task 8 — Tests**
| File | Purpose |
|------|---------|
| `backend/tests/__init__.py` | Package marker |
| `backend/tests/conftest.py` | Async DB fixture (aiosqlite) |
| `backend/tests/test_models.py` | Model CRUD + cascade + timestamp tests |

### No files modified
All files are net-new. No existing files are changed.

---

## Risk Assessment

### 🟡 Medium: SQLAlchemy 2.x async engine + Alembic async wiring
**Risk:** Alembic's `env.py` must use `run_sync` with the async engine's `sync_engine` attribute, not directly `create_async_engine`. The pattern is non-obvious and the official docs have changed between Alembic versions.
**Mitigation:** Pin `alembic>=1.13` (stable async support). Use the `asyncio` recipe from Alembic's own docs verbatim. Test with `alembic check` immediately after wiring.

### 🟡 Medium: UUID primary keys with PostgreSQL
**Risk:** `uuid.uuid4()` as Python-side default works in tests but `gen_random_uuid()` as server default requires `pgcrypto` extension in PostgreSQL < 14, or `uuid-ossp`. PostgreSQL 14+ includes it natively.
**Mitigation:** Add `op.execute('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')` in `upgrade()` as a guard. In aiosqlite tests, UUID PKs work without server defaults (Python-side default handles it).

### 🟡 Medium: `aiosqlite` dialect compatibility
**Risk:** Some SQLAlchemy column types or constraints (e.g., `TIMESTAMP(timezone=True)`) behave differently in SQLite. Tests may pass locally but fail against real PostgreSQL.
**Mitigation:** Keep migration round-trip tests (T7) explicitly against PostgreSQL. Mark aiosqlite tests with `@pytest.mark.sqlite` so they're clearly scoped. Document the SQLite-only limitation in `conftest.py`.

### 🟢 Low: Import order / circular imports
**Risk:** `models/__init__.py` re-exporting all models means `env.py` only needs one import to see the full metadata. As long as `database.py` does NOT import from `models/`, there's no circular dependency.
**Mitigation:** `database.py` only imports from `config.py`. Models import from `models/base.py`. Alembic `env.py` imports from `app.models` (which triggers all model imports). This one-way dependency graph avoids cycles.

### 🟢 Low: Missing `DATABASE_URL` at startup
**Risk:** FastAPI/SQLAlchemy will raise at import time if `DATABASE_URL` is not set and there's no default.
**Mitigation:** `pydantic-settings` will raise a clear `ValidationError` before the engine is created. `.env.example` documents the expected format. `get_db()` is a dependency — it's not called until a request arrives.

### 🔵 [NEEDS CLARIFICATION]: Soft-delete in V2
**Risk:** PRD mentions "soft-delete optional in V2". If soft-delete is added post-launch, it requires a migration adding a `deleted_at` column and updating all queries. No action needed now, but the schema should not make soft-delete harder to add.
**Decision needed:** Confirm whether a `deleted_at: Mapped[datetime | None]` column should be added now (nullable, default NULL) as a forward-compatibility measure, or left entirely to V2.

### 🔵 [NEEDS CLARIFICATION]: Full-text search on Notes
**Risk:** PRD says "V2: proper FTS with pg_trgm". Adding `pg_trgm` index later requires an `ALTER TABLE` migration. No blocking issue for F1 but worth noting.
**Decision needed:** Should `0001_initial_schema` include `CREATE EXTENSION IF NOT EXISTS pg_trgm` as a no-op placeholder to avoid a separate extension migration in V2?
