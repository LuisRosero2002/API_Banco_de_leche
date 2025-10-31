import { LecheSalaExtraccionController } from "../controllers/lecheSalaExtraccion.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class LecheSalaExtraccionRouter extends BaseRouter<LecheSalaExtraccionController, ConfigMiddleware> {
    constructor() {
        super(LecheSalaExtraccionController, ConfigMiddleware);
    }

    routes(): void {
        this.router.post('/postLecheSalaExtraccion',
            (req, res) => {
                this.controller.postLecheSalaExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/postFrascosExtraccion',
            (req, res) => {
                this.controller.postFrascosExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getAllLecheSalaExtraccion',
            (req, res) => {
                this.controller.getAllLecheSalaExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/putLecheSalaExtraccion/:id',
            (req, res) => {
                this.controller.putLecheSalaExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/putFrascosExtraccion/:id',
            (req, res) => {
                this.controller.putFrascosExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.get('/getFrascosRecolectadosBySalaExtraccion/:id',
            (req, res) => {
                this.controller.getFrascosRecolectadosBySalaExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}