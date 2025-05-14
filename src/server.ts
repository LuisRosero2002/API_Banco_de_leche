import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AuthRouter } from "./auth/auth.router";
import { ConfigServer } from "./config/config.server";
import { DataSource } from "typeorm";
import "reflect-metadata";
import { UsuariosRouter } from "./router/usuarios.router";
import { EmpleadosRouter } from "./router/empleados.router";
import { JwtStrategys } from "./auth/strategies/jwt.strategy";
import passport from "passport";
import { LoginStrategy } from "./auth/strategies/login.strategy";
import { MadresPotencialesRouter } from "./router/madresPotenciales.router";
import { EntidadesRouter } from "./router/entidades.router";
import { RutaRecoleccionRouter } from "./router/rutaRecoleccion.router";
import { MadresDonantesRouter } from "./router/madresDonantes.router";

class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT') || 8000;

    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.dbConnect();
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(passport.initialize());
        this.passportUse();
        this.app.use('/api', this.routers());
        this.listen();
    }
    routers(): Array<express.Router> {
        return [
            new AuthRouter().router,
            new UsuariosRouter().router,
            new EmpleadosRouter().router,
            new MadresPotencialesRouter().router,
            new EntidadesRouter().router,
            new RutaRecoleccionRouter().router,
            new MadresDonantesRouter().router
        ];
    }

    passportUse(){
        return [ 
            new JwtStrategys().use,
            new LoginStrategy().use
        ]
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);

        });
    }

    async dbConnect(): Promise<DataSource | void> {
        return this.InitConnect().then(() => {
            console.log("Database connected!");
        }).catch((error) => {
            console.error(error);
        });
    }


}

new ServerBootstrap();

