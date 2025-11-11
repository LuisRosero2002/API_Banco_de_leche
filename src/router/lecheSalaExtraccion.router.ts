import { LecheSalaExtraccionController } from "../controllers/lecheSalaExtraccion.controller";
import { ExtraccionFriam016DTO, FrascosExtraccionPutDTO } from "../DTOs/extraccionFriam016.DTO";
import { lecheSalaExtraccionDTO } from "../DTOs/lecheSalaExtraccion.DTO";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class LecheSalaExtraccionRouter extends BaseRouter<LecheSalaExtraccionController, ConfigMiddleware> {
    constructor() {
        super(LecheSalaExtraccionController, ConfigMiddleware);
    }

    routes(): void {
        this.router.post('/postLecheSalaExtraccion',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(lecheSalaExtraccionDTO),
            (req, res) => {
                this.controller.postLecheSalaExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/postFrascosExtraccion',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(ExtraccionFriam016DTO),
            (req, res) => {
                this.controller.postFrascosExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getAllLecheSalaExtraccion',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getAllLecheSalaExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/putLecheSalaExtraccion/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(lecheSalaExtraccionDTO),
            (req, res) => {
                this.controller.putLecheSalaExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/putFrascosExtraccion/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(FrascosExtraccionPutDTO),
            (req, res) => {
                this.controller.putFrascosExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.get('/getFrascosRecolectadosBySalaExtraccion/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getFrascosRecolectadosBySalaExtraccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}