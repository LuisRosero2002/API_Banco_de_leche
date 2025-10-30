import { ControlReenvaseController } from "../controllers/controlReenvase.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class ControlReenvaseRouter extends BaseRouter<ControlReenvaseController,ConfigMiddleware>{
    constructor(){
        super(ControlReenvaseController,ConfigMiddleware);
    }

    routes(): void {
        // Ruta protegida - requiere token JWT
        this.router.get('/getFrascosByMadreDonante/:id',
        this.middleware.checkJwtAuth(), // 👈 Validación de token
        (req,res)=>{
            this.controller.GetFrascosByMadreDonante(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        // Ruta protegida - requiere token JWT
        this.router.get('/getAllControlReenvase',
        // this.middleware.checkJwtAuth(), // 👈 Validación de token
        (req,res)=>{
            this.controller.GetAllControlReenvase(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        // Ruta protegida con validación de DTO y token
        this.router.post('/postControlReenvase',
        // this.middleware.checkJwtAuth(), // 👈 Primero validar token
        (req,res)=>{
            this.middleware.ValidateDTO(req.body), // 👈 Luego validar datos
            this.controller.PostControlReenvase(req,res)
            .catch(err=> res.status(500).send(err.message));
        });
        
        this.router.put('/putControlReenvase/:id',
        (req,res)=>{
            this.middleware.ValidateDTO(req.body);
            this.controller.PutControlReenvase(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        this.router.put('/putFrascoPasteurizado/:id',
        (req,res)=>{
            this.middleware.ValidateDTO(req.body);
            this.controller.PutFrascoPasteurizado(req,res)
            .catch(err=> res.status(500).send(err.message));
        });

        this.router.post('/postFrascoPasteurizado',
        (req,res)=>{
            this.middleware.ValidateDTO(req.body);
            this.controller.PostFrascoPasteurizado(req,res)
            .catch(err=> res.status(500).send(err.message));
        });
    }
}