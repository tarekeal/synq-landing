"""Unit tests for app/utils/auth.py"""
from datetime import UTC, datetime, timedelta
from uuid import uuid4

import jwt
import pytest

from app.config import settings
from app.utils.auth import (
    create_access_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)


def test_hash_and_verify_password():
    plain = "supersecret"
    hashed = hash_password(plain)
    assert hashed != plain
    assert verify_password(plain, hashed)
    assert not verify_password("wrongpassword", hashed)


def test_create_and_decode_access_token():
    user_id = uuid4()
    token = create_access_token(user_id)
    claims = decode_token(token)
    assert claims["sub"] == str(user_id)
    assert claims["type"] == "access"


def test_create_and_decode_refresh_token():
    user_id = uuid4()
    token = create_refresh_token(user_id)
    claims = decode_token(token)
    assert claims["sub"] == str(user_id)
    assert claims["type"] == "refresh"


def test_decode_expired_token():
    from fastapi import HTTPException

    user_id = uuid4()
    payload = {
        "sub": str(user_id),
        "exp": datetime.now(UTC) - timedelta(seconds=1),
        "type": "access",
    }
    expired_token = jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)

    with pytest.raises(HTTPException) as exc_info:
        decode_token(expired_token)
    assert exc_info.value.status_code == 401
