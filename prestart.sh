npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy
npx esbuild --bundle ./src/index.ts --outdir=dist --minify --sourcemap --platform=node
