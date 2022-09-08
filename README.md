## Description

[Nest](https://github.com/nestjs/nest) Game calculation based on Glicko rating for 1v1 PvP games

## Installation

```bash
$ npm install
```

## To run the app using Docker

```bash
$ npm run start:docker-dev
```

## To have access to Swagger documentation 

```bash
$ http://localhost:3000/api#
```


## To have access to pgAdmin database 

```bash
$ http://localhost:15432
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker specs

docker-compose -f docker/docker-compose.local.yaml down -v

docker volume prune

and delete /database/postgres
