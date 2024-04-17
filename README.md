# sceno-server

checklist

[x] npx prisma migrate dev --name init
[x] npx prisma migrate deploy

database: prisma

1. Ensure the correction of `DATABASE_URL` key in `.env` file. (user, password, host, port, database)
2. Edit `prisma/scheme.prisma`.
3. Run `npx prisma generate`.
