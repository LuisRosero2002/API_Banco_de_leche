import { DistribucionFriam031Controller } from "../controllers/distribucionFriam031.controller";
import { DistribucionFriam031DTO } from "../DTOs/distribucionFriam031.DTO";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class DistribucionFriam031Router extends BaseRouter<DistribucionFriam031Controller, ConfigMiddleware> {
    constructor() {
        super(DistribucionFriam031Controller, ConfigMiddleware);
    }

    routes(): void {
        this.router.get('/distribucion/:mes/:anio',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.GetDistribucionPorMes(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/distribucion/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.GetDistribucionById(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/distribucion/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(DistribucionFriam031DTO),
            (req, res) => {
                this.controller.PutDistribucion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/distribucion',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(DistribucionFriam031DTO),
            (req, res) => {
                this.controller.PostDistribucion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/frascos-pasteurizados-distribucion',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.GetAllFrascosPasteurizados(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}
