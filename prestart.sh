npx esbuild --bundle ./src/index.ts --outdir=dist --minify --sourcemap --platform=node
npx prisma generate
