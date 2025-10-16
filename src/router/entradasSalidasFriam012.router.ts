import { EntradasSalidasFriam012Controller } from "../controllers/entradasSalidasFriam012.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class EntradasSalidasFriam012Router extends BaseRouter<EntradasSalidasFriam012Controller, ConfigMiddleware> {
    constructor() {
        super(EntradasSalidasFriam012Controller, ConfigMiddleware);
    }
    routes(): void {
        this.router.get('/getEntradasSalidaLecheCruda/:mes/:anio',
            (req, res) => {
                this.controller.getEntradasSalidaLecheCruda(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.post('/createEntradaSalidaLecheCruda',
            (req, res) => {
                this.controller.createEntradaSalidaLecheCruda(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.put('/putEntradaSalidaLecheCruda/:id',
            (req, res) => {
                this.controller.putEntradaSalidaLecheCruda(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}
