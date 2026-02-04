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
import { VisitaMadresRouter } from "./router/visitasMadres.router";
import { EntradasSalidasFriam012Router } from "./router/entradasSalidasFriam012.router";
import { LecheSalaExtraccionRouter } from "./router/lecheSalaExtraccion.router";
import { LecheDistribucionFrhos063Router } from "./router/lecheDistribucionFrhos063.router";
import { SeguimientoMadresRouter } from "./router/seguimientoMadres.router";
import { ControlReenvaseRouter } from "./router/controlReenvase.router";
import { SeleccionClasificacionRouter } from "./router/seleccionClasificacion.router";
import { TemperaturaPasteurizadorRouter } from "./router/temperaturaPasteurizador.router";
import { ControlMicrobiologicoRouter } from "./router/controlMicrobiologico.router";
import { ConformidadFriam017Router } from "./router/conformidadFriam017.router";
import { EntradasSalidasFriam013Router } from "./router/entradasSalidasFriam013.router";
import { DistribucionFriam031Router } from "./router/distribucionFriam031.router";
import { IngresoPasteurizadaFrnut013Router } from "./router/ingresoPasteurizadaFrnut013.router";
import { CurvaPenetracionRouter } from "./router/curvaPenetracion.router";

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
            new MadresDonantesRouter().router,
            new VisitaMadresRouter().router,
            new SeguimientoMadresRouter().router,
            new EntradasSalidasFriam012Router().router,
            new LecheSalaExtraccionRouter().router,
            new LecheDistribucionFrhos063Router().router,
            new ControlReenvaseRouter().router,
            new SeleccionClasificacionRouter().router,
            new TemperaturaPasteurizadorRouter().router,
            new ConformidadFriam017Router().router,
            new ControlMicrobiologicoRouter().router,
            new ControlMicrobiologicoRouter().router,
            new EntradasSalidasFriam013Router().router,
            new DistribucionFriam031Router().router,
            new IngresoPasteurizadaFrnut013Router().router,
            new CurvaPenetracionRouter().router
        ];
    }

    passportUse() {
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
