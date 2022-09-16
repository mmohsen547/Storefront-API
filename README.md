# Storefront Backend Project
A web API for a storeFront.
## Getting Started
This readme will help you run the application locally.

## Technologies Used

- Postgres 
- Nodejs
- dotenv 
- db-migrate
- jsonwebtoken 
- jasmine
- express

## Setup steps
#### Download dependencies
You need to download all the dependencies the app need using this command.
```shell    
    npm install
```    
- Create database to connect to the application.
- update the .env file with your local environment variable
- make a migration. `db-migrate up`
- test the application. `npm test`
- run the application. `npm start`

#### Database Creation
You need to create a database with a specific user then connect it to the application.
```shell
# create a user
CREATE USER my_user WITH PASSWORD 'password123'

# Create databases with my_user as owner of the database
CREATE DATABASE storefront WITH OWNER my_user
CREATE DATABASE storefront_test WITH OWNER my_user
```

#### Enviroment Variables
You need to create .env file and store enviroment variables in it.

.env file example:
```shell

PORT=3000
# database varaiables
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=store
POSTGRES_USER=my_user
POSTGRES_PASSWORD=password123
POSTGRES_TEST_DB=storefront_test
DB_PORT=5432

# encryption variables & JWT
SALT_ROUNDS=10
BCRYPT_PASSWORD=speak-freind-and-enter
PEPPER=allohamora123
SECRET_TOKEN=secret-token

# Environmet variable
ENV=dev
```
#### Make migrations
```shell
db-migrate up
```

#### Test the application
```shell
npm test
```

#### Run the application
```shell
npm start
```

