import { Request, Response } from "express";
import { MadresPotencialesController } from "../controllers/madresPotenciales.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";
import { MadresPotencialesDTO } from "../DTOs/madresPotenciales.DTO";

export class MadresPotencialesRouter extends BaseRouter<MadresPotencialesController, ConfigMiddleware> {
    constructor() {
        super(MadresPotencialesController, ConfigMiddleware)
    }

    routes(): void {
        this.router.post('/CreateMadrePotencial',
            this.middleware.ValidateDTO(MadresPotencialesDTO),
            (req: Request, res: Response) => {
                this.controller.CreateMadrePotencial(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/UpdateMadrePotencial/:id',
            (req: Request, res: Response) => {
                this.controller.UpdateMadrePotencial(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getMadresPotenciales',
            (req: Request, res: Response) => {
                this.controller.getMadrePotencial(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.get('/getAllMadresPotenciales',
            (req: Request, res: Response) => {
                this.controller.getAllMadrePotencial(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.get('/getAllMadresPotencialesByMadreDonante',
            (req: Request, res: Response) => {
                this.controller.getAllMadrePotencialByMadreDonante(req, res)
                    .catch(err => res.status(500).send(err.message));
            });



    }
}