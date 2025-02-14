## Project Description

## Stack

## Initial Setup

### Create .env file

- (optional) PORT - default 3001
- DATABASE_URL - `postgresql://USER:PASS@HOST:PORT/user_preference_center_challenge?schema=public`

### Run dev initial Prisma migration command

```bash
npx prisma migrate dev --name init
```

### Available scripts

- `npm run start` - start the server
- `npm run lint` - lint the code
- `npm run test` - run the tests
- `npm run prisma:migrate` - run the prisma migration
