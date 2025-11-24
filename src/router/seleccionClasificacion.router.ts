import { SeleccionClasificacionController } from "../controllers/seleccionClasificacion.controller";
import { AcidezDornicDTO } from "../DTOs/acidezDornic.DTO";
import { AnalisisSensorialDTO } from "../DTOs/analisisSensorial.DTO";
import { CrematocritoDTO } from "../DTOs/crematocrito.DTO";
import { UpdateSeleccionClasificacionDTO } from "../DTOs/seleccionClasificacion.DTO";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class SeleccionClasificacionRouter extends BaseRouter<SeleccionClasificacionController, ConfigMiddleware> {
    constructor() {
        super(SeleccionClasificacionController, ConfigMiddleware);
    }

    routes(): void {
        this.router.get('/getSeleccionClasificacion',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.GetSeleccionClasificacionPorMesYAnio(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getAcidezDornic/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.GetAcidezDornicPorSeleccionId(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getAnalisisSensorial/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.GetAnalisisSensorialPorSeleccionId(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getCrematocrito/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.GetCrematocritoPorSeleccionId(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/postAcidezDornic',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(AcidezDornicDTO),
            (req, res) => {
                this.controller.PostAcidezDornic(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/postAnalisisSensorial',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(AnalisisSensorialDTO),
            (req, res) => {
                this.controller.PostAnalisisSensorial(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/postCrematocrito',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(CrematocritoDTO),
            (req, res) => {
                this.controller.PostCrematocrito(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/putSeleccionClasificacion/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(UpdateSeleccionClasificacionDTO),
            (req, res) => {
                this.controller.PutSeleccionClasificacion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}
