import { EntradasSalidasFriam012Controller } from "../controllers/entradasSalidasFriam012.controller";
import { EntradasSalidasLecheCrudaDTO } from "../DTOs/entradasSalidasLecheCruda.DTO";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class EntradasSalidasFriam012Router extends BaseRouter<EntradasSalidasFriam012Controller, ConfigMiddleware> {
    constructor() {
        super(EntradasSalidasFriam012Controller, ConfigMiddleware);
    }
    routes(): void {
        this.router.get('/getEntradasSalidaLecheCruda/:mes/:anio',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getEntradasSalidaLecheCruda(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.post('/createEntradaSalidaLecheCruda',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(EntradasSalidasLecheCrudaDTO),
            (req, res) => {
                this.controller.createEntradaSalidaLecheCruda(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.put('/putEntradaSalidaLecheCruda/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(EntradasSalidasLecheCrudaDTO),
            (req, res) => {
                this.controller.putEntradaSalidaLecheCruda(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}
