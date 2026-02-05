import { EntradasSalidasFriam013Controller } from "../controllers/entradasSalidasFriam013.controller";
import { EntradasSalidasPasteurizadaDTO } from "../DTOs/entradasSalidasPasteurizada.DTO";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class EntradasSalidasFriam013Router extends BaseRouter<EntradasSalidasFriam013Controller, ConfigMiddleware> {
    constructor() {
        super(EntradasSalidasFriam013Controller, ConfigMiddleware);
    }
    routes(): void {
        this.router.get('/getEntradasSalidaLechePasteurizada/:lote',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getEntradasSalidaLechePasteurizada(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.put('/putEntradaSalidaLechePasteurizada/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(EntradasSalidasPasteurizadaDTO),
            (req, res) => {
                this.controller.putEntradaSalidaLechePasteurizada(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}