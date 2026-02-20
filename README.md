# NestJS + Redis Cache + Queue Example

This project wires Redis into NestJS for:

- **Caching** via `@nestjs/cache-manager` + `cache-manager-redis-store`
- **Background jobs/queues** via `@nestjs/bull` + `bull`

## 1) Install dependencies

```bash
npm install
```

## 2) Configure environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

## 3) Run Redis

If you have Docker:

```bash
docker run --name redis -p 6379:6379 -d redis:7
```

## 4) Run the API

```bash
npm run start:dev
```

## Endpoints

### Cache

- `POST /cache`

```json
{
  "key": "user:1",
  "value": "{\"name\":\"Ada\"}",
  "ttlSeconds": 120
}
```

- `GET /cache/:key`
- `DELETE /cache/:key`

### Queue

- `POST /queue/tasks`

```json
{
  "event": "send-email",
  "to": "hello@example.com",
  "template": "welcome"
}
```

A worker (`TasksProcessor`) consumes jobs and is where you plug in business logic.
