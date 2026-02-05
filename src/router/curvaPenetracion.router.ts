import { Router } from "express";
import { CurvaPenetracionController } from "../controllers/curvaPenetracion.controller";
import { BaseRouter } from "./router";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { CurvaPenetracionDTO } from "../DTOs/curvaPenetracion.DTO";

export class CurvaPenetracionRouter extends BaseRouter<CurvaPenetracionController, ConfigMiddleware> {
    constructor() {
        super(CurvaPenetracionController, ConfigMiddleware);
    }

    routes(): void {
        this.router.get('/curva/:volumen',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getCurvaPenetracion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/curva',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(CurvaPenetracionDTO),
            (req, res) => {
                this.controller.createCurvaPenetracion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/curva/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(CurvaPenetracionDTO),
            (req, res) => {
                this.controller.updateCurvaPenetracion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }

}