import { EntidadesController } from "../controllers/entidades.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class EntidadesRouter extends BaseRouter<EntidadesController, ConfigMiddleware> {
    constructor() {
        super(EntidadesController, ConfigMiddleware)
    }

    routes(): void {
        this.router.get('/getAllEntidades',
            (req, res) => {
                this.controller.getAllEntidades(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getEntidadById/:id',
            (req, res) => {
                this.controller.getEntidadById(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/createEntidad',
            (req, res) => {
                this.controller.createEntidad(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/deleteEntidad/:id',
            (req, res) => {
                this.controller.deleteEntidad(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}