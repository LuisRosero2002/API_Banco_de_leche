import { ControlReenvaseController } from "../controllers/controlReenvase.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class ControlReenvaseRouter extends BaseRouter<ControlReenvaseController,ConfigMiddleware>{
    constructor(){
        super(ControlReenvaseController,ConfigMiddleware);
    }

    routes(): void {
        this.router.get('/getFrascosByMadreDonante/:id',
        (req,res)=>{
            this.controller.GetFrascosByMadreDonante(req,res)
            .catch(err=> res.status(500).send(err.message));
        });
    }
}