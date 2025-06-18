import { MadresDonantesController } from "../controllers/madresDonantes.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";
import { upload } from '../uploads/multer/config_multer';
import { Request, Response } from "express";
import { MadreDonanteDTO } from "../DTOs/madresDonantes.DTO";

export class MadresDonantesRouter extends BaseRouter<MadresDonantesController, ConfigMiddleware> {
    constructor() {
        super(MadresDonantesController, ConfigMiddleware)
    }

    routes(): void {
        this.router.post(
            '/CreateMadreDonante',
            this.middleware.ValidateDTO(MadreDonanteDTO),
            (req: Request, res: Response) => {
                this.controller.CreateMadreDonante(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        this.router.get(
            '/GetMadreDonante',
            (req: Request, res: Response) => {
                this.controller.GetMadresDonantes(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );

        this.router.post('/uploadPDFs', upload.single('pdf'),
            (req: Request, res: Response) => {
                this.controller.uploadPDF(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        )

        this.router.get('/pdfs/:filename',
            (req: Request, res: Response) => {
                this.controller.getPdf(req, res)
                    .catch(err => res.status(500).send(err.message));
            }
        );
    }

}