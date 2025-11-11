import { RutaRecoleccionController } from "../controllers/rutaRecoleccion.controller";
import { CasasVisitasDTO } from "../DTOs/casasVisitasDTO";
import { FrascosRecolectadosDTO } from "../DTOs/frascosRecolectados.DTO";
import { RutaRecoleccionDTO } from "../DTOs/rutaRecolecion.DTO";
import { TemperaturaCasasDTO } from "../DTOs/temperaturasCasas.DTO";
import { TemperaturasRutasDTO } from "../DTOs/temperaturasRuta.DTO";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class RutaRecoleccionRouter extends BaseRouter<RutaRecoleccionController, ConfigMiddleware> {
    constructor() {
        super(RutaRecoleccionController, ConfigMiddleware);
    }

    routes(): void {
        this.router.post('/createRutaRecoleccion',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(RutaRecoleccionDTO),
            (req, res) => {
                this.controller.createRutaRecoleccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getAllRutasRecoleccion',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getAllRutasRecoleccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
            
        this.router.get('/getRutaRecoleccionById/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getRutaRecoleccionById(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/updateRutaRecoleccion/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(RutaRecoleccionDTO),
            (req, res) => {
                this.controller.updateRutaRecoleccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/createTemperaturaCasas',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(TemperaturaCasasDTO),
            (req, res) => {
                this.controller.createTemperaturaCasas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getTemperaturasCasas/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getTemperaturasCasas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/updateTemperaturaCasas/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(TemperaturaCasasDTO),
            (req, res) => {
                this.controller.updateTemperaturaCasas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/updateTemperaturaCasas',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.updateTemperaturaCasasByCasaAndRuta(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/createCasasVisitas',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(CasasVisitasDTO),
            (req, res) => {
                this.controller.createCasasVisitas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getCasasVisitas/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getCasasVisitas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/updateCasas/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(CasasVisitasDTO),
            (req, res) => {
                this.controller.updateCasas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/updateFrascos/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(FrascosRecolectadosDTO),
            (req, res) => {
                this.controller.updateFrascos(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/createFrascosRecolectados',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(FrascosRecolectadosDTO),
            (req, res) => {
                this.controller.createFrascosRecolectados(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getFrascosRecolectados/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getFrascosRecolectadosById(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getCongeladores',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getCongeladores(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/createTemperaturaRuta',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(TemperaturasRutasDTO),
            (req, res) => {
                this.controller.createTemperaturaRuta(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getTemperaturaRuta/:id',
            this.middleware.checkJwtAuth(),
            (req, res) => {
                this.controller.getTemperaturaRuta(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
            
        this.router.put('/updateTemperaturaRuta/:id',
            this.middleware.checkJwtAuth(),
            this.middleware.ValidateDTO(TemperaturasRutasDTO),
            (req, res) => {
                this.controller.updateTemperaturaRuta(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}