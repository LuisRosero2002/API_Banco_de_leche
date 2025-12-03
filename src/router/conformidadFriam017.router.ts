import { ConfomidadesFriam016Controller } from "../controllers/conformidadesFriam017.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class ConformidadFriam017Router extends BaseRouter<ConfomidadesFriam016Controller,ConfigMiddleware>{
    constructor(){
        super(ConfomidadesFriam016Controller,ConfigMiddleware);
    }

    routes(): void {
        this.router.get('conformidades/:mes/:anio', 
            // this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getConformidades(req, res)
                .catch(err=> res.status(500).send(err.message));
            }
        );
        this.router.get('/lote/:lote', 
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getFrascosByLote(req, res)
                .catch(err=> res.status(500).send(err.message));
            }
        );  
    }
}