# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript/Express REST API for managing a Human Milk Bank (Banco de Leche Humana) information system. The application uses TypeORM for database access with MySQL, implements JWT authentication with Passport.js, and follows a layered architecture pattern.

## Development Commands

### Running the Application
- `npm run start:dev` - Development mode with hot reload (cleans, builds, watches TypeScript, restarts on changes)
- `npm run start` - Standard mode (cleans, builds, runs)
- `npm run start:prod` - Production mode (sets NODE_ENV=production)

### Building
- `npm run clean` - Remove dist directory
- `npm run build` - Compile TypeScript to dist/

### Database Migrations
- `npm run m:gen -- "src/migrations/MigrationName"` - Generate a new migration based on entity changes
- `npm run m:run` - Run pending migrations
- `npm run typeorm` - Direct access to TypeORM CLI (uses ts-node)

## Architecture

### Layered Structure
The application follows a strict layered architecture:

```
Router Layer (src/router/)
  -> Controller Layer (src/controllers/)
    -> Service Layer (src/services/)
      -> Repository Layer (TypeORM entities in src/entities/)
```

### Core Components

**BaseRouter Pattern** ([src/router/router.ts](src/router/router.ts))
- All routers extend `BaseRouter<TController, UMiddleware>` which provides a generic pattern for route definition
- Each router instantiates its controller and middleware dependencies
- Routes are defined in the `routes()` method

**BaseService Pattern** ([src/config/base.service.ts](src/config/base.service.ts))
- All services extend `BaseService<T>` which provides database repository access
- Services automatically get TypeORM repository through `execRepository` property
- Each service inherits from ConfigServer for environment variable access

**ConfigServer** ([src/config/config.server.ts](src/config/config.server.ts))
- Abstract base class that handles environment configuration and database connection
- Manages environment file loading based on NODE_ENV (e.g., `.production.env`, `.development.env`)
- Provides `InitConnect()` method for establishing database connection
- Used by ServerBootstrap and BaseService

**HttpResponse Utility** ([src/shared/responses/http.response.ts](src/shared/responses/http.response.ts))
- Standardized response format for all API endpoints
- Methods: `Ok()`, `NotFound()`, `BadRequest()`, `Unauthorized()`, `Forbidden()`, `Error()`
- All responses include status code, status message, and data/error payload

### Authentication & Security

**Passport Strategies** ([src/auth/strategies/](src/auth/strategies/))
- JWT strategy for protected routes
- Local login strategy for username/password authentication
- Configured in ServerBootstrap via `passportUse()` method

**Middleware** ([src/middlewares/config.middleware.ts](src/middlewares/config.middleware.ts))
- `ValidateDTO<T>()` - Validates request bodies using class-validator decorators on DTOs
- `checkJwtAuth()` - Applies JWT authentication to protected routes
- `passAuth(type)` - Generic passport authentication wrapper
- `checkAdminRole()` - Role-based access control (implementation pending)

### Database Configuration

**TypeORM Setup** ([src/config/data-source.ts](src/config/data-source.ts))
- Uses SnakeNamingStrategy to convert camelCase to snake_case for database columns
- Entities auto-loaded from `src/entities/*.entity.ts`
- Migrations auto-loaded from `src/migrations/*.ts`
- `synchronize: false` - migrations are used instead of auto-sync
- `migrationsRun: true` - runs migrations on startup
- SSL enabled with `rejectUnauthorized: false`

**Entity Conventions**
- 54 entities representing the milk bank domain (donors, collection, pasteurization, distribution, etc.)
- Decorators: `@Entity()`, `@PrimaryGeneratedColumn()`, `@Column()`, `@OneToMany()`, `@ManyToOne()`, etc.
- Timestamps: `@CreateDateColumn()` and `@UpdateDateColumn()` for audit trails
- Password fields use `@Exclude()` from class-transformer to prevent serialization

### Request/Response Flow

1. Request hits router endpoint
2. Middleware validates DTO and/or checks JWT authentication
3. Controller method is invoked
4. Controller calls service method
5. Service uses TypeORM repository to access database
6. Service returns data to controller
7. Controller uses HttpResponse to format and send response

### DTOs and Validation

**DTOs** ([src/DTOs/](src/DTOs/))
- Data Transfer Objects with class-validator decorators
- Used with `ValidateDTO` middleware to validate incoming requests
- Separated from entities to control what fields are accepted in requests

### Server Bootstrap

**Entry Point** ([src/server.ts](src/server.ts))
- `ServerBootstrap` class extends ConfigServer
- Initializes Express app, middleware (CORS, Morgan, Passport), and routes
- Connects to database via `dbConnect()` method
- All routers registered under `/api` prefix
- Default port: 8000 (configurable via PORT env variable)

## Important Patterns

### Adding a New Module

When adding a new feature module (e.g., for a new form/process):

1. Create entity in [src/entities/](src/entities/) with TypeORM decorators
2. Create DTO in [src/DTOs/](src/DTOs/) with validation decorators
3. Create service extending BaseService in [src/services/](src/services/)
4. Create controller in [src/controllers/](src/controllers/) with HttpResponse handling
5. Create router extending BaseRouter in [src/router/](src/router/)
6. Register router in [src/server.ts](src/server.ts) `routers()` array
7. Generate and run migration: `npm run m:gen -- "src/migrations/AddYourFeature"`

### Environment Variables

Environment files follow the pattern: `.{NODE_ENV}.env`
- `.env` - default
- `.production.env` - when NODE_ENV=production
- `.development.env` - when NODE_ENV=development

Required variables (see [src/config/data-source.ts](src/config/data-source.ts)):
- DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE
- PORT (for Express server)

## Domain Context

This system manages a comprehensive milk bank workflow including:
- Donor management (potential mothers, active donors)
- Collection routes and visits
- Milk reception and storage
- Pasteurization process control
- Microbiological testing
- Distribution and conformity tracking
- Temperature monitoring
- Repackaging control

Most forms are based on specific protocols (FRIAM, FRHOS codes visible in entity/router names).
