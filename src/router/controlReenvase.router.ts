import { ControlReenvaseController } from "../controllers/controlReenvase.controller";
import { ControlReenvaseDTO } from "../DTOs/controlReenvase.DTO";
import { FrascosPasteurizadosDTO } from "../DTOs/frascosPasteurizados.DTO";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class ControlReenvaseRouter extends BaseRouter<ControlReenvaseController,ConfigMiddleware>{
    constructor(){
        super(ControlReenvaseController,ConfigMiddleware);
    }

    routes(): void {
        this.router.get('/getFrascosByMadreDonante/:id',
        this.middleware.checkJwtAuth(),
        (req,res)=>{
            this.controller.GetFrascosByMadreDonante(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        this.router.get('/getAllControlReenvase',
        this.middleware.checkJwtAuth(),
        (req,res)=>{
            this.controller.GetAllControlReenvase(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        this.router.post('/postControlReenvase',
        this.middleware.checkJwtAuth(),
        this.middleware.ValidateDTO(ControlReenvaseDTO),
        (req,res)=>{
            this.controller.PostControlReenvase(req,res)
            .catch(err=> res.status(500).send(err.message));
        });
        
        this.router.put('/putControlReenvase',
        this.middleware.checkJwtAuth(),
        this.middleware.ValidateDTO(ControlReenvaseDTO),
        (req,res)=>{
            this.controller.PutControlReenvase(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        this.router.put('/putFrascoPasteurizado/:id',
        this.middleware.checkJwtAuth(),
        this.middleware.ValidateDTO(FrascosPasteurizadosDTO),
        (req,res)=>{
            this.controller.PutFrascoPasteurizado(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        this.router.post('/postFrascoPasteurizado',
        this.middleware.checkJwtAuth(),
        this.middleware.ValidateDTO(FrascosPasteurizadosDTO),
        (req,res)=>{
            this.controller.PostFrascoPasteurizado(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        this.router.get('/getFrascoPasteurizadoByControlReenvase/:id',
        this.middleware.checkJwtAuth(),
        (req,res)=>{
            this.controller.GetFrascoPasteurizadoByControlReenvase(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        this.router.get('/getAllFrascosPasteurizados',
        this.middleware.checkJwtAuth(),
        (req,res)=>{
            this.controller.GetAllFrascosPasteurizados(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        this.router.get('/getControlReenvase/:id',
        this.middleware.checkJwtAuth(),
        (req,res)=>{
            this.controller.GetControlReenvaseById(req,res)
            .catch(err=> res.status(500).send(err.message));
    });

        
    }
}