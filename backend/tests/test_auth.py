"""Integration tests for /auth routes."""
import pytest


REGISTER_URL = "/auth/register"
LOGIN_URL = "/auth/login"
REFRESH_URL = "/auth/refresh"
ME_URL = "/auth/me"

VALID_USER = {
    "email": "test@example.com",
    "password": "password123",
    "display_name": "Test User",
}


# ---------------------------------------------------------------------------
# Register
# ---------------------------------------------------------------------------


async def test_register_success(client):
    resp = await client.post(REGISTER_URL, json=VALID_USER)
    assert resp.status_code == 201
    data = resp.json()
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["token_type"] == "bearer"


async def test_register_duplicate_email(client):
    await client.post(REGISTER_URL, json=VALID_USER)
    resp = await client.post(REGISTER_URL, json=VALID_USER)
    assert resp.status_code == 400


async def test_register_short_password(client):
    resp = await client.post(
        REGISTER_URL,
        json={"email": "a@b.com", "password": "short7"},
    )
    assert resp.status_code == 422


async def test_register_invalid_email(client):
    resp = await client.post(
        REGISTER_URL,
        json={"email": "not-an-email", "password": "password123"},
    )
    assert resp.status_code == 422


# ---------------------------------------------------------------------------
# Login
# ---------------------------------------------------------------------------


async def test_login_success(client):
    await client.post(REGISTER_URL, json=VALID_USER)
    resp = await client.post(
        LOGIN_URL,
        json={"email": VALID_USER["email"], "password": VALID_USER["password"]},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "access_token" in data
    assert "refresh_token" in data


async def test_login_wrong_password(client):
    await client.post(REGISTER_URL, json=VALID_USER)
    resp = await client.post(
        LOGIN_URL,
        json={"email": VALID_USER["email"], "password": "wrongpassword"},
    )
    assert resp.status_code == 401


async def test_login_unknown_email(client):
    resp = await client.post(
        LOGIN_URL,
        json={"email": "nobody@example.com", "password": "password123"},
    )
    assert resp.status_code == 401


# ---------------------------------------------------------------------------
# Refresh
# ---------------------------------------------------------------------------


async def test_refresh_success(client):
    reg = await client.post(REGISTER_URL, json=VALID_USER)
    refresh_token = reg.json()["refresh_token"]
    resp = await client.post(REFRESH_URL, json={"refresh_token": refresh_token})
    assert resp.status_code == 200
    data = resp.json()
    assert "access_token" in data
    assert "refresh_token" in data


async def test_refresh_with_access_token(client):
    reg = await client.post(REGISTER_URL, json=VALID_USER)
    access_token = reg.json()["access_token"]
    resp = await client.post(REFRESH_URL, json={"refresh_token": access_token})
    assert resp.status_code == 401


async def test_refresh_invalid_token(client):
    resp = await client.post(REFRESH_URL, json={"refresh_token": "badtoken"})
    assert resp.status_code == 401


# ---------------------------------------------------------------------------
# Me
# ---------------------------------------------------------------------------


async def test_me_success(client):
    reg = await client.post(REGISTER_URL, json=VALID_USER)
    access_token = reg.json()["access_token"]
    resp = await client.get(ME_URL, headers={"Authorization": f"Bearer {access_token}"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["email"] == VALID_USER["email"]


async def test_me_no_token(client):
    resp = await client.get(ME_URL)
    assert resp.status_code == 401


async def test_me_invalid_token(client):
    resp = await client.get(ME_URL, headers={"Authorization": "Bearer badtoken"})
    assert resp.status_code == 401
