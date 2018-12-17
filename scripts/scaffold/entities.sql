CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- To have the minimal data of a user.
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(id),
    UNIQUE(username)
);

-- All about access tokens
CREATE TYPE accessTokenType AS ENUM ('DEFAULT', 'FACEBOOK', 'GOOGLE', 'TWITTER', 'LINKEDIN');
DROP TABLE IF EXISTS accessToken;
CREATE TABLE accessToken (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token VARCHAR NOT NULL,
    userId UUID NOT NULL REFERENCES users (id),
    ttl INTEGER NOT NULL DEFAULT 100000,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type accessTokenType default 'DEFAULT',
    UNIQUE(id)
);
