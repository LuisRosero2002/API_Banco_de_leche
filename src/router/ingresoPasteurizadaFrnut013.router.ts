import { IngresoPasteurizadaFrnut013Controller } from "../controllers/IngresoPasteurizadaFrnut013.controller";
import { IngresoLechePasteurizadaFriam013DTO } from "../DTOs/ingresoLechePasteurizadaFriam013.DTO";
import { LactarioDTO } from "../DTOs/Lactario.DTO";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class IngresoPasteurizadaFrnut013Router extends BaseRouter<IngresoPasteurizadaFrnut013Controller, ConfigMiddleware> {
    constructor() {
        super(IngresoPasteurizadaFrnut013Controller, ConfigMiddleware);
    }

    routes(): void {
        this.router.get('/ingresos/:mes/:anio',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getIngresoLechePasteurizadaFrnut013(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );
        this.router.post('/ingresos',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(IngresoLechePasteurizadaFriam013DTO),
            (req, res) => {
                this.controller.postIngresoLechePasteurizadaFrnut013(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );
        this.router.put('/ingresos/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(IngresoLechePasteurizadaFriam013DTO),
            (req, res) => {
                this.controller.putIngresoLechePasteurizadaFrnut013(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );
        this.router.get('/lactarios/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getLactariosByIngresoLechePasteurizada(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );
        this.router.post('/lactarios',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(LactarioDTO),
            (req, res) => {
                this.controller.postLactarioByIngresoLechePasteurizada(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );
        this.router.put('/lactarios/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(LactarioDTO),
            (req, res) => {
                this.controller.putLactarioByIngresoLechePasteurizada(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );
        this.router.get('/frascos-pasteurizados-ingreso',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getAllFrascosPasteurizados(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );
    }
}