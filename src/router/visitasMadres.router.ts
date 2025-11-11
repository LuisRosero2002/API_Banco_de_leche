import { Request, Response } from "express";
import { VisitaMadreController } from "../controllers/visitaMadres.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";
import { VisitaMadresDTO } from "../DTOs/visitaMadresDTO";
import { RespuestaVisitaDTO } from "../DTOs/respuestasVisitaDTO";

export class VisitaMadresRouter extends BaseRouter<VisitaMadreController, ConfigMiddleware>{
    constructor() {
        super(VisitaMadreController, ConfigMiddleware);
    }
    routes():void {
        this.router.post(
            '/CreateVisitaMadre',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(VisitaMadresDTO),
            (req:Request, res:Response) => {
                this.controller.CreateVisitaMadre(req,res)
                    .catch(err => res.status(500).send(err.message));
            }
        )
        this.router.get(
            '/GetVisitaMadre/:id',
            this.middleware.checkJwtAuth(),
            (req:Request, res:Response) => {
                this.controller.getVisitaMadre(req,res)
                    .catch(err => res.status(500).send(err.message));
            }
        )
        this.router.post(
            '/SaveRespuestasVisitaMadre',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(RespuestaVisitaDTO),
            (req:Request, res:Response) => {
                this.controller.SaveRespuestasVisitaMadre(req,res)
                    .catch(err => res.status(500).send(err.message));
            }
        )
        this.router.get(
            '/GetRespuestasVisitaMadre/:id',
            this.middleware.checkJwtAuth(),
            (req:Request, res:Response) => {
                this.controller.GetRespuestasVisitaMadre(req,res)
                    .catch(err => res.status(500).send(err.message));
            }
        )
        this.router.get(
            '/GetPreguntasVisitaMadre',
            this.middleware.checkJwtAuth(),
            (req:Request, res:Response) => {
                this.controller.GetPreguntasVisitaMadre(req,res)
                    .catch(err => res.status(500).send(err.message));
            }
        )
        this.router.get(
            '/GetCategoriasVisitaMadre',
            this.middleware.checkJwtAuth(),
            (req:Request, res:Response) => {
                this.controller.GetCategoriasVisitaMadre(req,res)
                    .catch(err => res.status(500).send(err.message));
            }
        )
    }
}