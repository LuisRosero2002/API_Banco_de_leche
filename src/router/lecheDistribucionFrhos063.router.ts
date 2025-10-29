import { LecheDistribucionFrhos063Controller } from "../controllers/lecheDistribucionFrhos063.controller";
import { LecheDistribucionFrhos063DTO } from "../DTOs/lecheDistribucionFrhos063.DTO";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class LecheDistribucionFrhos063Router extends BaseRouter<LecheDistribucionFrhos063Controller, ConfigMiddleware>{
    constructor() {
        super(LecheDistribucionFrhos063Controller, ConfigMiddleware);
    }
    routes(): void {
        this.router.post(
            "/postLecheDistribucion",
            this.middleware.ValidateDTO(LecheDistribucionFrhos063DTO),
            (req, res) => {
                this.controller.postLecheDistribucion(req, res)
                .catch(err => res.status(500).send(err.message));
            }
        );
        this.router.get(
            "/getLecheDistribucion",
            (req, res) => {
                this.controller.getLecheDistribucion(req, res)
                .catch(err => res.status(500).send(err.message));
            }
        );
        this.router.put(
            "/putLecheDistribucion/:id",
            this.middleware.ValidateDTO(LecheDistribucionFrhos063DTO),
            (req, res) => {
                this.controller.putLecheDistribucion(req, res)
                .catch(err => res.status(500).send(err.message));
            }
        );
        this.router.get(
            "/getMadresInternasNoDonantes",
            (req, res) => {
                this.controller.getMadresInternasNoDonantes(req, res)
                .catch(err => res.status(500).send(err.message));
            }
        );
    }
}