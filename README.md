# GoBarber is a project development for Rocktseat Bootcamp.

  1. [Prerequisites](https://github.com/lucijr/GoBarber/blob/main/README.md#prerequisites)
  2. [Startup instructions](https://github.com/lucijr/GoBarber/blob/main/README.md#startup-instructions)
  3. [Available Scripts](https://github.com/lucijr/GoBarber/blob/main/README.md#available-scripts)
  4. [Available Routes](https://github.com/lucijr/GoBarber/blob/main/README.md#available-routes)

## Prerequisites

  [Docker](https://docs.docker.com/engine/install/), [Node](https://nodejs.org/en/download/), [Yarn](https://classic.yarnpkg.com/en/docs/install), [DBaver](https://dbeaver.io/download/).

  This code as tested with [Insomia](https://insomnia.rest/download/core/?) and developed with [Visual Studio Code](https://code.visualstudio.com/download).

## Startup instructions

  1. [Download](https://github.com/lucijr/GoBarber/archive/main.zip) and extract or git clone git@github.com:lucijr/GoBarber.git
  2. Open folder in terminal
  3. Run yarn
  4. Run docker run --name gostack_gobarber -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
  5. With DBaver connect [database](https://github.com/lucijr/GoBarber/blob/main/ormconfig.json) and create table gostack_gobarber
  6. yarn migration:run
  7. yarn dev:server

## Available Scripts

  In the project directory, you can run:

### `yarn dev:server`

  Runs the server in the development mode.
  url: http://localhost:3333

  You will also see any errors in the console.

### `yarn typeorm`

  Execute typeorm scripts using config file [ormconfig.json](https://github.com/lucijr/GoBarber/blob/main/ormconfig.json).

### `yarn typeorm migration:create -n NameOfMigration`.

  Created new migration woth name NameOfMigration

### `yarn typeorm migration:run`

  Update [migrations]((https://github.com/lucijr/GoBarber/tree/main/src/database/migrations)) in database.

### `yarn typeorm migration:revert`

  Revert last migration of database.

## Available Routes

  [Insomnia Config](https://github.com/lucijr/GoBarber/archive/Insomnia.zip) extract and import in Insomnia, content all used routes.

  In environment dev contains 2 variables, base_url for url and token for JWT.

## Users

### `POST /users`

  Send json containing name, email and password for create a user.

### `PATCH /users/avatar`

  Its router require authentication [JWT](https://github.com/lucijr/GoBarber/blob/main/README.md#post-sessions).

  Send Multipart Form containing avatar and localFile for create or update avatar of user.

## Appointments

### `POST /appointments`

  Its router require authentication [JWT](https://github.com/lucijr/GoBarber/blob/main/README.md#post-sessions).

  Send json containing provider_id and date for create a appointment.

### `GET /appointment`

  Its router require authentication [JWT](https://github.com/lucijr/GoBarber/blob/main/README.md#post-sessions).

  List appointments of provider.

## Sessions

### `POST /sessions`

  Its router create a JWT.

  Send json containing email and password for create a JWT.
