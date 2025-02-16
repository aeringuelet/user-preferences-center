## Project Description

Simple Preference Center API for users where they can manage their choice regarding the channel they want to get notified on. They can choose between getting notified by email, SMS, neither, or both.

Solves [Didomi's backend challenge](https://github.com/didomi/challenges/blob/master/backend/README.md)

## Stack

- Typescript
- Node.js
- Express
- [Prisma ORM](https://www.prisma.io/)
- PostgreSQL
- Vitest

## Initial Setup

### Create .env file

- (optional) `PORT` - `default 3001`
- `DATABASE_URL` - _postgresql://USER:PASS@HOST:PORT/user_preference_center_challenge?schema=public_

1. Install dependencies

```bash
npm install
```

2. Run dev initial Prisma migration command

```bash
npx prisma migrate dev --name init
```

## Available scripts

- `npm run compile`
    - compile the typescript code
- `npm run start`
    - compile and start the server
- `npm run lint`
    - lint the code
- `npm run test`
    - run the tests
- `npm run prisma:migrate`
    - run prisma migration AFTER CHANGES IN SCHEMA

## API Endpoints

### User `(/users)`

- `POST /`
    - Create a user
- `GET /:id`
    - Get a user by id

### Consent `(/consents)`

- `POST /`
    - Create or update a consent
- `GET /changes/:userId`
    - Get the consent changes for a user
