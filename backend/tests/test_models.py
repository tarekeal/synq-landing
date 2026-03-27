"""
Model round-trip tests using aiosqlite in-memory DB.

Tests: creation, relationships, cascade delete, auto-timestamps.
"""
import uuid

import pytest
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.note import Note
from app.models.user import User


def make_user(**kwargs) -> User:
    defaults = dict(
        email=f"user-{uuid.uuid4().hex[:8]}@example.com",
        hashed_password="$2b$12$fakehash",
        display_name="Test User",
    )
    return User(**{**defaults, **kwargs})


def make_note(user_id: uuid.UUID, **kwargs) -> Note:
    defaults = dict(title="Untitled", content=None, user_id=user_id)
    return Note(**{**defaults, **kwargs})


class TestUserModel:
    async def test_user_creation(self, db_session: AsyncSession) -> None:
        """Insert a User and query it back — all fields must match."""
        user = make_user(email="alice@example.com", display_name="Alice")
        db_session.add(user)
        await db_session.commit()
        await db_session.refresh(user)

        result = await db_session.get(User, user.id)
        assert result is not None
        assert result.email == "alice@example.com"
        assert result.display_name == "Alice"
        assert result.hashed_password == "$2b$12$fakehash"

    async def test_user_repr(self, db_session: AsyncSession) -> None:
        user = make_user(email="repr@example.com")
        db_session.add(user)
        await db_session.commit()

        assert "repr@example.com" in repr(user)
        assert "User" in repr(user)

    async def test_user_email_is_unique(self, db_session: AsyncSession) -> None:
        """Inserting two Users with the same email must raise."""
        from sqlalchemy.exc import IntegrityError

        db_session.add(make_user(email="dup@example.com"))
        await db_session.commit()

        db_session.add(make_user(email="dup@example.com"))
        with pytest.raises(IntegrityError):
            await db_session.commit()
        await db_session.rollback()

    async def test_user_id_is_uuid(self, db_session: AsyncSession) -> None:
        user = make_user()
        db_session.add(user)
        await db_session.commit()
        assert isinstance(user.id, uuid.UUID)


class TestNoteModel:
    async def test_note_creation(self, db_session: AsyncSession) -> None:
        """Insert User + Note and verify the FK relationship."""
        user = make_user()
        db_session.add(user)
        await db_session.flush()

        note = make_note(user_id=user.id, title="My Note", content="Hello world")
        db_session.add(note)
        await db_session.commit()
        await db_session.refresh(note)

        result = await db_session.get(Note, note.id)
        assert result is not None
        assert result.title == "My Note"
        assert result.content == "Hello world"
        assert result.user_id == user.id

    async def test_note_nullable_content(self, db_session: AsyncSession) -> None:
        user = make_user()
        db_session.add(user)
        await db_session.flush()

        note = make_note(user_id=user.id, content=None)
        db_session.add(note)
        await db_session.commit()

        result = await db_session.get(Note, note.id)
        assert result is not None
        assert result.content is None

    async def test_note_repr(self, db_session: AsyncSession) -> None:
        user = make_user()
        db_session.add(user)
        await db_session.flush()

        note = make_note(user_id=user.id, title="Repr Test")
        db_session.add(note)
        await db_session.commit()

        assert "Repr Test" in repr(note)
        assert "Note" in repr(note)

    async def test_user_notes_cascade_delete(self, db_session: AsyncSession) -> None:
        """Deleting a User must cascade-delete all owned Notes."""
        user = make_user()
        db_session.add(user)
        await db_session.flush()

        note1 = make_note(user_id=user.id, title="Note 1")
        note2 = make_note(user_id=user.id, title="Note 2")
        db_session.add_all([note1, note2])
        await db_session.commit()

        note1_id = note1.id
        note2_id = note2.id

        await db_session.delete(user)
        await db_session.commit()

        assert await db_session.get(Note, note1_id) is None
        assert await db_session.get(Note, note2_id) is None

    async def test_user_owns_multiple_notes(self, db_session: AsyncSession) -> None:
        user = make_user()
        db_session.add(user)
        await db_session.flush()

        notes = [make_note(user_id=user.id, title=f"Note {i}") for i in range(3)]
        db_session.add_all(notes)
        await db_session.commit()

        stmt = select(Note).where(Note.user_id == user.id)
        result = await db_session.execute(stmt)
        rows = result.scalars().all()
        assert len(rows) == 3


class TestTimestamps:
    async def test_timestamps_set_on_insert(self, db_session: AsyncSession) -> None:
        """created_at and updated_at must be populated after commit."""
        user = make_user()
        db_session.add(user)
        await db_session.commit()
        await db_session.refresh(user)

        assert user.created_at is not None
        assert user.updated_at is not None

    async def test_note_timestamps_set_on_insert(self, db_session: AsyncSession) -> None:
        user = make_user()
        db_session.add(user)
        await db_session.flush()

        note = make_note(user_id=user.id)
        db_session.add(note)
        await db_session.commit()
        await db_session.refresh(note)

        assert note.created_at is not None
        assert note.updated_at is not None
