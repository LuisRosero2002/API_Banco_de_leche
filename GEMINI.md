# Resumen del Proyecto

Este proyecto es una aplicación Node.js basada en TypeScript que sirve como backend para un sistema de gestión del Banco de Leche Humana. Utiliza el framework Express.js para manejar las solicitudes HTTP y el enrutamiento, y TypeORM como ORM para las interacciones con la base de datos, probablemente con una base de datos MySQL. El proyecto sigue una arquitectura estructurada con una clara separación de responsabilidades, incluyendo enrutadores, controladores, servicios, entidades (DTOs) y archivos de configuración. La autenticación se maneja usando Passport.js with JWT y estrategias locales.

## Tecnologías y Arquitectura

### Tecnologías y Librerías

*   **Lenguaje:** TypeScript
*   **Entorno de ejecución:** Node.js
*   **Framework web:** Express.js
*   **ORM:** TypeORM
*   **Base de datos:** MySQL (inferido del driver `mysql2`)
*   **Autenticación:** Passport.js (con estrategias JWT y locales)
*   **Dependencias clave:**
    *   `bcrypt`: para el hash de contraseñas.
    *   `class-validator` y `class-transformer`: para la validación y transformación de DTOs.
    *   `cors`: para habilitar el Intercambio de Recursos de Origen Cruzado (CORS).
    *   `dotenv`: para cargar variables de entorno desde un archivo `.env`.
    *   `jsonwebtoken`: para la creación y verificación de JSON Web Tokens.
    *   `morgan`: para el registro de solicitudes HTTP.
    *   `multer`: para manejar la subida de archivos.

### Arquitectura

El proyecto sigue una **arquitectura modular y en capas**:

*   **Capa de Presentación (Enrutadores y Controladores):** Maneja las solicitudes HTTP y delega la lógica de negocio a la capa de servicio.
*   **Capa de Lógica de Negocio (Servicios):** Contiene la lógica central de la aplicación.
*   **Capa de Acceso a Datos (Entidades y TypeORM):** Gestiona los datos y las interacciones con la base de datos.
*   **Configuración:** Configuración centralizada para el servidor y la base de datos.
*   **Autenticación:** Manejada por las estrategias de Passport.js.

## Construcción y Ejecución

Para poner el proyecto en marcha, sigue estos pasos:

1.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

2.  **Ejecutar en Modo de Desarrollo:**
    Este comando iniciará el servidor en modo de desarrollo con recarga automática al cambiar archivos.
    ```bash
    npm run start:dev
    ```

3.  **Ejecutar en Modo de Producción:**
    Este comando construirá el proyecto e iniciará el servidor в modo de producción.
    ```bash
    npm run start:prod
    ```

4.  **Construir el Proyecto:**
    Este comando transpilará el código de TypeScript a JavaScript.
    ```bash
    npm run build
    ```

## Migraciones

El proyecto utiliza TypeORM para las migraciones de la base de datos.

*   **Generar una nueva migración:**
    ```bash
    npm run m:gen -- "src/migrations/YourMigrationName"
    ```

*   **Ejecutar migraciones:**
    ```bash
    npm run m:run
    ```

## Convenciones de Desarrollo

*   **TypeScript:** Todo el código base está escrito en TypeScript, por lo que todo el código nuevo también debe estar en TypeScript.
*   **Linting y Formateo:** Aunque no está definido explícitamente en el `package.json`, se recomienda usar un linter y un formateador como ESLint y Prettier para mantener un estilo de código consistente.
*   **Modularidad:** El proyecto está organizado en módulos (por ejemplo, `auth`, `router`, `services`, `controllers`, `entities`). Las nuevas características deben seguir este enfoque modular.
*   **Variables de Entorno:** El proyecto utiliza un archivo `.env` para las variables de entorno. El archivo `src/config/config.server.ts` se encarga de cargar estas variables.
*   **Autenticación:** La autenticación se implementa usando Passport.js. Las nuevas rutas autenticadas deben protegerse utilizando la estrategia de Passport apropiada.
*   **Manejo de Errores:** Se debe utilizar un mecanismo de manejo de errores consistente en toda la aplicación.
*   **Pruebas:** No hay scripts de prueba explícitos en el `package.json`. Se recomienda encarecidamente agregar un framework de pruebas como Jest o Mocha para garantizar la calidad del código.