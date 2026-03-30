# F2: Auth API — Implementation Plan

## Summary

**What we're building**: A JWT-based authentication API for the Synq backend, providing user registration, login, token refresh, and current-user endpoints. This is Milestone 1 (M1) of the Synq roadmap.

**Why**: The frontend (M3+) needs authenticated sessions to access notes CRUD (M2). Auth is the critical dependency for every downstream feature.

**Scope**:
- `POST /auth/register` — create account, return token pair
- `POST /auth/login` — verify credentials, return token pair
- `POST /auth/refresh` — exchange refresh token for new access token
- `GET /auth/me` — return current user profile (requires valid access token)

**Out of scope for F2**: rate limiting, email verification, password reset, OAuth.

**Starting point**: M0 is complete. We have async SQLAlchemy ORM, `User` model with `hashed_password`, `config.py` with `SECRET_KEY`, and pytest fixtures. No FastAPI app or routes exist yet.

---

## Implementation Tasks

### Task 1 — Add auth dependencies to pyproject.toml

**Goal**: Install `bcrypt`, `pyjwt`, and `python-multipart`.

**Acceptance criteria**:
- `bcrypt>=4.0` present in `[project.dependencies]`
- `pyjwt>=2.8` present in `[project.dependencies]`
- `python-multipart>=0.0.5` present (FastAPI form support)
- `pip install -e .` (or `uv sync`) succeeds without conflicts

**File changes**:
- `backend/pyproject.toml` — add three dependencies

---

### Task 2 — Extend Settings with JWT config

**Goal**: Add JWT algorithm, token expiry settings, and CORS origins to `config.py`.

**Acceptance criteria**:
- `algorithm: str = "HS256"` in `Settings`
- `access_token_expire_minutes: int = 30` in `Settings`
- `refresh_token_expire_days: int = 7` in `Settings`
- `cors_origins: list[str] = ["http://localhost:5173"]` in `Settings`
- `.env.example` updated with new vars

**File changes**:
- `backend/app/config.py` — extend `Settings` class
- `backend/.env.example` — add `ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`, `REFRESH_TOKEN_EXPIRE_DAYS`, `CORS_ORIGINS`

---

### Task 3 — Create auth schemas (Pydantic models)

**Goal**: Define all request/response shapes for auth endpoints.

**Acceptance criteria**:
- `RegisterRequest`: `email` (EmailStr), `password` (min 8 chars), `display_name` (optional str)
- `LoginRequest`: `email` (EmailStr), `password` (str)
- `TokenResponse`: `access_token` (str), `refresh_token` (str), `token_type: str = "bearer"`
- `RefreshRequest`: `refresh_token` (str)
- `UserResponse`: `id` (UUID), `email` (str), `display_name` (str | None), `created_at` (datetime)
- All models use Pydantic v2 (`model_config = ConfigDict(from_attributes=True)` where needed)

**File changes**:
- `backend/app/schemas/__init__.py` — new file
- `backend/app/schemas/auth.py` — new file with all auth schemas

---

### Task 4 — Create auth utilities (password + JWT)

**Goal**: Isolated, testable functions for password hashing and JWT operations.

**Acceptance criteria**:
- `hash_password(plain: str) -> str` — bcrypt hash
- `verify_password(plain: str, hashed: str) -> bool` — constant-time comparison
- `create_access_token(user_id: UUID) -> str` — signed HS256 JWT with `sub`, `exp`, `type: "access"`
- `create_refresh_token(user_id: UUID) -> str` — signed HS256 JWT with `sub`, `exp`, `type: "refresh"`
- `decode_token(token: str) -> dict` — raises `HTTPException(401)` on invalid/expired token
- `get_current_user(token, db)` — FastAPI dependency that returns `User` from token, raises 401 if not found

**File changes**:
- `backend/app/utils/__init__.py` — new file
- `backend/app/utils/auth.py` — new file with all utilities and `get_current_user` dependency

---

### Task 5 — Create auth route handlers

**Goal**: Implement the four auth endpoints wired to the DB and utilities.

**Acceptance criteria**:
- `POST /auth/register`:
  - Rejects duplicate email with `400 Email already registered`
  - Hashes password before storing
  - Returns `TokenResponse` (201)
- `POST /auth/login`:
  - Returns generic `401 Invalid credentials` for both bad email and bad password (no leaking)
  - Returns `TokenResponse` (200)
- `POST /auth/refresh`:
  - Validates refresh token type claim (`type == "refresh"`)
  - Returns new `TokenResponse` with fresh access + refresh tokens (200)
  - Returns `401` for invalid/expired token
- `GET /auth/me`:
  - Requires `Authorization: Bearer <access_token>` header
  - Returns `UserResponse` (200)
  - Returns `401` if token missing or invalid

**File changes**:
- `backend/app/routes/__init__.py` — new file
- `backend/app/routes/auth.py` — new file with `APIRouter(prefix="/auth")`

---

### Task 6 — Create FastAPI application entry point

**Goal**: Wire up the FastAPI app with CORS, the auth router, and a health check.

**Acceptance criteria**:
- `GET /health` returns `{"status": "ok"}` (200)
- CORS middleware uses `settings.cors_origins`
- Auth router mounted at `/auth`
- App can start with `uvicorn app.main:app --reload`
- `422` validation errors return clean JSON (FastAPI default is fine)

**File changes**:
- `backend/app/main.py` — new file (FastAPI instance, CORS, router include)

---

### Task 7 — Write auth endpoint tests

**Goal**: Full integration test coverage for all four endpoints using the existing in-memory SQLite test fixture.

**Acceptance criteria**:
- `POST /auth/register`:
  - Happy path: returns 201 with `access_token` and `refresh_token`
  - Duplicate email: returns 400
  - Short password (< 8 chars): returns 422
  - Invalid email format: returns 422
- `POST /auth/login`:
  - Happy path: returns 200 with token pair
  - Wrong password: returns 401
  - Unknown email: returns 401
- `POST /auth/refresh`:
  - Happy path: returns 200 with new token pair
  - Expired/invalid token: returns 401
  - Access token used as refresh token: returns 401
- `GET /auth/me`:
  - Happy path: returns user profile
  - Missing token: returns 401
  - Invalid token: returns 401
- Unit tests for `hash_password` / `verify_password` / `create_access_token` / `decode_token`

**File changes**:
- `backend/tests/test_auth.py` — new file (integration tests via `httpx.AsyncClient`)
- `backend/tests/test_auth_utils.py` — new file (utility unit tests)
- `backend/tests/conftest.py` — extend with `client` fixture (AsyncClient + lifespan)

---

## Testing Strategy

| Layer | Tool | What's tested |
|---|---|---|
| Unit | pytest + pytest-asyncio | `hash_password`, `verify_password`, `create_access_token`, `create_refresh_token`, `decode_token` (valid, expired, wrong type) |
| Integration | pytest + httpx.AsyncClient | All four endpoints, happy paths + error paths |
| Schema | pytest (Pydantic v2) | `RegisterRequest` min-length, email validation, optional fields |

**Test DB**: reuse existing `aiosqlite` in-memory fixture from `conftest.py` — no live PostgreSQL needed.

**AsyncClient fixture pattern**:
```python
@pytest.fixture
async def client(db_session):
    async with AsyncClient(app=app, base_url="http://test") as c:
        yield c
```

**Coverage target**: all happy paths + each documented error path. No need for 100% line coverage in F2.

---

## File Changes

```
backend/
├── pyproject.toml                        MODIFY  — add bcrypt, pyjwt, python-multipart
├── .env.example                          MODIFY  — add JWT config vars
├── app/
│   ├── config.py                         MODIFY  — extend Settings with JWT fields
│   ├── main.py                           CREATE  — FastAPI app, CORS, router mount
│   ├── schemas/
│   │   ├── __init__.py                   CREATE
│   │   └── auth.py                       CREATE  — RegisterRequest, LoginRequest, TokenResponse, UserResponse
│   ├── utils/
│   │   ├── __init__.py                   CREATE
│   │   └── auth.py                       CREATE  — password + JWT helpers, get_current_user
│   └── routes/
│       ├── __init__.py                   CREATE
│       └── auth.py                       CREATE  — /register, /login, /refresh, /me
└── tests/
    ├── conftest.py                       MODIFY  — add AsyncClient fixture
    ├── test_auth.py                      CREATE  — endpoint integration tests
    └── test_auth_utils.py               CREATE  — utility unit tests
```

**Total**: 8 new files, 3 modified files.

---

## Risk Assessment

### MEDIUM — SQLite vs PostgreSQL UUID handling
The test DB is SQLite (aiosqlite) but production uses PostgreSQL. SQLite stores UUIDs as strings; PostgreSQL uses native UUID type. SQLAlchemy handles the mapping transparently, but token claims use `str(user.id)` — ensure `decode_token` parses back to `UUID` consistently.

**Mitigation**: Store `sub` as `str(uuid)` in JWT; cast back with `UUID(claims["sub"])` in `get_current_user`.

---

### MEDIUM — Refresh token rotation vs single-use
The plan issues a new token pair on `/refresh` but does not invalidate the old refresh token (no token blacklist). A stolen refresh token remains valid until expiry.

**Mitigation**: Acceptable for M1. Add token family tracking or Redis blacklist in a future milestone. Document this limitation.

---

### LOW — bcrypt cost factor in tests
Default bcrypt rounds (12) make pytest runs noticeably slow with many hashing calls.

**Mitigation**: In `conftest.py`, monkeypatch bcrypt rounds to 4 for the test session, or use a `TEST_BCRYPT_ROUNDS` env override.

---

### LOW — CORS preflight in development
Vite dev server on `:5173` sends `OPTIONS` preflight requests. FastAPI's `CORSMiddleware` handles this automatically, but `cors_origins` must exactly match the `Origin` header.

**Mitigation**: Default `cors_origins` to `["http://localhost:5173"]`; allow override via env var for CI and production.

---

### NO RISK — Alembic migrations
No new database columns are needed. The `hashed_password` column already exists on `users`. F2 is pure application-layer code on top of M0's schema.

---

*Plan authored: 2026-03-27 | Milestone: M1 | Feature: F2*
