import { ControlMicrobiologicoController } from "../controllers/controlMicrobiologico.controller";
import { ControlMicrobiologicoDTO } from "../DTOs/controlMicrobiologico.DTO";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class ControlMicrobiologicoRouter extends BaseRouter<ControlMicrobiologicoController, ConfigMiddleware> {
    constructor() {
        super(ControlMicrobiologicoController, ConfigMiddleware);
    }

    routes(): void {
        /**
         * GET - Get control microbiologico by lote and ciclo
         * Returns frascos with their control data and shared InfoControlMicrobiologico
         */
        this.router.get('/getControlMicrobiologicoByLoteAndCiclo/:idLote/:idCiclo',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.GetControlMicrobiologicoByLoteAndCiclo(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        /**
         * POST - Create control microbiologico records
         * Body: ControlMicrobiologicoDTO (infoControl + array of controles)
         */
        this.router.post('/postControlMicrobiologico',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(ControlMicrobiologicoDTO),
            (req, res) => {
                this.controller.PostControlMicrobiologico(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        /**
         * PUT - Update control microbiologico records
         * Body: ControlMicrobiologicoDTO (infoControl + array of controles)
         */
        this.router.put('/putControlMicrobiologico',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(ControlMicrobiologicoDTO),
            (req, res) => {
                this.controller.PutControlMicrobiologico(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}
