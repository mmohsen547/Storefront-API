CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname varchar(55),
    lastname varchar(55),
    username varchar(255),
    password_hash varchar(255)
)