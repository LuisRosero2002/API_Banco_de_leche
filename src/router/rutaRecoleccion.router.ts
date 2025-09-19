import { RutaRecoleccionController } from "../controllers/rutaRecoleccion.controller";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { BaseRouter } from "./router";

export class RutaRecoleccionRouter extends BaseRouter<RutaRecoleccionController, ConfigMiddleware> {
    constructor() {
        super(RutaRecoleccionController, ConfigMiddleware);
    }

    routes(): void {
        this.router.post('/createRutaRecoleccion',
            (req, res) => {
                this.controller.createRutaRecoleccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getAllRutasRecoleccion',
            (req, res) => {
                this.controller.getAllRutasRecoleccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/updateRutaRecoleccion/:id',
            (req, res) => {
                this.controller.updateRutaRecoleccion(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/createTemperaturaCasas',
            (req, res) => {
                this.controller.createTemperaturaCasas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getTemperaturasCasas/:id',
            (req, res) => {
                this.controller.getTemperaturasCasas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/updateTemperaturaCasas/:id',
            (req, res) => {
                this.controller.updateTemperaturaCasas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/updateTemperaturaCasas',
            (req, res) => {
                this.controller.updateTemperaturaCasasByCasaAndRuta(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/createCasasVisitas',
            (req, res) => {
                this.controller.createCasasVisitas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getCasasVisitas/:id',
            (req, res) => {
                this.controller.getCasasVisitas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/updateCasas/:id',
            (req, res) => {
                this.controller.updateCasas(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.put('/updateFrascos/:id',
            (req, res) => {
                this.controller.updateFrascos(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/createFrascosRecolectados',
            (req, res) => {
                this.controller.createFrascosRecolectados(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getFrascosRecolectados/:id',
            (req, res) => {
                this.controller.getFrascosRecolectadosById(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.get('/getCongeladores',
            (req, res) => {
                this.controller.getCongeladores(req, res)
                    .catch(err => res.status(500).send(err.message));
            });

        this.router.post('/createTemperaturaRuta',
            (req, res) => {
                this.controller.createTemperaturaRuta(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.get('/getTemperaturaRuta/:id',
            (req, res) => {
                this.controller.getTemperaturaRuta(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
        this.router.put('/updateTemperaturaRuta/:id',
            (req, res) => {
                this.controller.updateTemperaturaRuta(req, res)
                    .catch(err => res.status(500).send(err.message));
            });
    }
}