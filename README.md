## Software de gestion de informacion Banco de leche humana

## Instalacion del proyecto

**Lista de dependencias para instalacion**

- npm install class-validator class-transformer cors dotenv express morgan mysql2 typeorm typeorm-naming-strategies typescript reflect-metadata bcrypt jsonwebtoken passport passport-local passport-jwt
- npm install -D @types/cors @types/express @types/morgan concurrently nodemon rimraf ts-node @types/bcrypt @types/jsonwebtoken @types/passport @types/passport-local @types/passport-jwt

**Inicializacion de Typescript**

- npx tsc --init

## Ejecucion del proyecto

**Comando**

- npm run start:dev

## Migraciones

- npm run m:gen -- "ruta migracion"
- npm run m:run