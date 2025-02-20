import express from "express";
import morgan from "morgan";
import cors from "cors";
import { AuthRouter } from "./auth/auth.router";
import { ConfigEnviroment } from "./config/config.server";
import { DataSource } from "typeorm";

class ServerBootstrap extends ConfigEnviroment {
    public app: express.Application = express();
    private port: number = this.getNumberEnv('PORT') || 8000;

    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.dbConnect();
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use('/api', this.routers());
        this.listen();
    }

    routers(): Array<express.Router> {
        return [
            // Add your routers here
            new AuthRouter().router
        ];
    }

    public listen() {

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

