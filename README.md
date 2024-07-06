# NodeJS with Redis Example

A NodeJS example with Redis run locally on Docker

To load env file run the command inside the folder contains `.env` (to be create like `env.example`):

```
export $(grep -v '^#' .env | xargs)
```

To run app:

```
node --watch ./backend/app.js
```

To run docker image:

```
docker-compose up cache
```

To get a list of your docker image

```
docker ps -a
docker container stop <ID>
```

Alcuni comandi docker:

```
docker-compose up -d (o --detach)
docer-compose up --force-recreate
```