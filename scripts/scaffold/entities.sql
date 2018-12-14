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
