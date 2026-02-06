# Documentación Técnica - Banco de Leche Humana

## 1. Visión General del Proyecto

Este proyecto es el backend para un **Sistema de Gestión de Banco de Leche Humana**. Su objetivo principal es administrar todo el ciclo de vida del banco de leche, desde la captación de madres donantes, pasando por la recolección, análisis de calidad (microbiológico y físico-químico), pasteurización, hasta la distribución de la leche a los beneficiarios (neonatos).

El sistema está diseñado para garantizar la trazabilidad, seguridad y calidad de la leche humana donada, cumpliendo con los estándares requeridos.

## 2. Tecnologías y Librerías

El proyecto está construido sobre **Node.js** utilizando **TypeScript** para asegurar un código robusto y tipado.

### Core
*   **Node.js**: Entorno de ejecución.
*   **Express.js** (`^4.21.2`): Framework web para manejar las rutas y el servidor HTTP.
*   **TypeScript** (`^5.9.3`): Superset de JavaScript que añade tipado estático.

### Base de Datos y ORM
*   **MySQL** (`mysql2`): Motor de base de datos relacional.
*   **TypeORM** (`^0.3.20`): ORM (Object-Relational Mapping) para interactuar con la base de datos utilizando clases y objetos en lugar de consultas SQL puras.
*   **typeorm-naming-strategies**: Convenciones de nombres para las tablas y columnas.

### Autenticación y Seguridad
*   **Passport.js** (`^0.7.0`): Middleware de autenticación.
    *   `passport-jwt`: Estrategia para validar Tokens JDBC.
    *   `passport-local`: Estrategia para autenticación con usuario y contraseña.
*   **JsonWebToken (JWT)** (`^9.0.2`): Generación y verificación de tokens de acceso.
*   **Bcrypt** (`^5.1.1`): Librería para el hasheo seguro de contraseñas.
*   **Cors**: Manejo de Cross-Origin Resource Sharing.

### Validación y Transformación
*   **class-validator** (`^0.14.1`): Decoradores para validación de datos en los DTOs.
*   **class-transformer** (`^0.5.1`): Transformación de objetos planos a instancias de clases.

### Utilidades
*   **Multer** (`^1.4.5`): Middleware para el manejo de carga de archivos (multipart/form-data), usado para subir PDFs y documentos.
*   **Dotenv**: Carga de variables de entorno desde archivos `.env`.
*   **Morgan**: Logger de solicitudes HTTP para desarrollo.

---

## 3. Arquitectura del Sistema

El proyecto sigue una **Arquitectura en Capas (Layered Architecture)**, promoviendo la separación de responsabilidades y facilitando el mantenimiento y escalabilidad.

### Capas Principales

1.  **Capa de Enrutamiento (Routers)**:
    *   Define los endpoints de la API.
    *   Utiliza middlewares para autenticación (`checkJwtAuth`) y validación (`ValidateDTO`).
    *   Delega la petición al Controlador correspondiente.
    *   Ubicación: `src/router`

2.  **Capa de Controladores (Controllers)**:
    *   Recibe los objetos `Request` y `Response` de Express.
    *   Extrae los datos de la petición (body, params, query).
    *   Invoca a la Capa de Servicios para ejecutar la lógica de negocio.
    *   Envía la respuesta HTTP adecuada al cliente.
    *   Ubicación: `src/controllers`

3.  **Capa de Servicios (Services)**:
    *   Contiene la **lógica de negocio** pura.
    *   No depende directamente de Express.
    *   Interactúa con la base de datos a través de las Entidades o Repositorios de TypeORM.
    *   Realiza cálculos, validaciones de negocio y transformaciones de datos.
    *   Ubicación: `src/services`

4.  **Capa de Acceso a Datos (Entities)**:
    *   Define los modelos de base de datos utilizando decoradores de TypeORM (`@Entity`, `@Column`, `@OneToMany`, etc.).
    *   Representa las tablas de la base de datos MySQL.
    *   Ubicación: `src/entities`

### Flujo de Datos

1.  **Petición**: El cliente envía una solicitud HTTP (ej. `POST /api/CreateUser`).
2.  **Router**: Intercepta la solicitud, verifica el token JWT y valida el cuerpo con el DTO.
3.  **Controller**: Recibe los datos validados y llama al método `service.createUser(...)`.
4.  **Service**: Hashea la contraseña, verifica si el usuario existe y guarda la entidad usando `UserRepository`.
5.  **Database**: MySQL almacena el registro.
6.  **Respuesta**: El dato guardado retorna por las capas hasta que el Controller envía un JSON al cliente.

---

## 4. Estructura del Proyecto

A continuación se detalla el contenido y propósito de cada carpeta dentro de `src/`:

### `src/`
Directorio raíz del código fuente.

*   **`auth/`**: Contiene la configuración de Passport y las estrategias de autenticación (Local y JWT).
*   **`config/`**: Archivos de configuración global.
    *   `config.server.ts`: Variables de entorno y configuración del servidor.
    *   `data-source.ts`: Configuración de conexión a la base de datos MySQL con TypeORM.
*   **`controllers/`**: Clases controladoras que manejan las peticiones HTTP (ej. `usuarios.controller.ts`).
*   **`DTOs/` (Data Transfer Objects)**: Clases que definen la estructura de los datos esperados en las peticiones, con decoradores de validación (ej. `IsString`, `IsNotEmpty`).
*   **`entities/`**: Modelos de base de datos. Cada archivo representa una tabla (ej. `usuarios.entity.ts`).
*   **`interfaces/`**: Definiciones de tipos TypeScript globales o compartidos.
*   **`middlewares/`**: Middlewares personalizados.
    *   `config.middleware.ts`: Probablemente un decorador o clase base para lógica intermedia.
    *   Validadores de DTO y Auth guards.
*   **`router/`**: Definición de rutas y mapeo a controladores. Heredan de una clase base `BaseRouter`.
*   **`services/`**: Lógica de negocio. Contiene los métodos crud y operaciones complejas.
*   **`shared/`**: Utilidades compartidas, como respuestas HTTP estandarizadas (`response.http.ts`).
*   **`uploads/`**: Configuración de `multer` para la subida de archivos y almacenamiento temporal.

---

## 5. Endpoints y Flujos Clave

El sistema cuenta con más de 100 endpoints organizados modularmente.

### Flujo de Autenticación
*   **Login**: El usuario envía credenciales -> `Passport-Local` las verifica contra la BD hash -> Se genera un `JWT` firmado.
*   **Protección**: Las rutas protegidas usan un middleware que intercepta el header `Authorization: Bearer <token>`, lo decodifica con `Passport-JWT` e inyecta el usuario en `req.user`.

### Gestión de Calidad (Ejemplo)
El sistema maneja flujos complejos de calidad:
1.  **Conformidad (Friam017)**: Evalúa características físicas (olor, color).
2.  **Control Microbiológico**: Registra cultivos y resultados de coliformes.
3.  **Curva de Penetración**: Monitorea temperaturas de pasteurización en tiempo real.

### Gestión de Leche
1.  **Recolección**: Rutas y visitas domiciliarias.
2.  **Acopio**: Entradas de leche cruda (inventario).
3.  **Procesamiento**: Reenvase y Pasteurización.
4.  **Distribución**: Salida de leche pasteurizada a neonatos.

## 6. Ejecución del Proyecto

### Scripts Disponibles
Definidos en `package.json`:

*   `npm run start:dev`: Inicia el servidor en modo desarrollo con recarga automática (`nodemon`).
*   `npm run build`: Compila el código TypeScript a JavaScript en la carpeta `dist`.
*   `npm run start:prod`: Inicia el servidor desde la carpeta compilada `dist`.
*   `npm run m:gen -- "Nombre"`: Genera una nueva migración de base de datos basada en cambios en las entidades.
*   `npm run m:run`: Ejecuta las migraciones pendientes en la base de datos.

### Requisitos Previos
*   Servidor MySQL corriendo.
*   Archivo `.env` configurado con credenciales de BD y claves secretas JWT.

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
