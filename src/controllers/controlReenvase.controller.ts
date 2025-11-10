import { Request, Response } from "express";
import { ControlReenvaseServices } from "../services/controlReenvase.service";
import { HttpResponse } from "../shared/responses/http.response";

export class ControlReenvaseController {
    constructor(
        private readonly control: ControlReenvaseServices = new ControlReenvaseServices(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    async GetFrascosByMadreDonante(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.control.getFrascosByMadreDonante(Number(id));
            if (data.length === 0) return this.httpResponse.NoContent(res, "No hay frascos registrados para esta madre donante");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
    async GetAllControlReenvase(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.control.getAllControlReenvase();
            if (data.length === 0) return this.httpResponse.NoContent(res, "No hay registros");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PostControlReenvase(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.control.postControlReenvase(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PutControlReenvase(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.control.putControlReenvase(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PutFrascoPasteurizado(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.control.putFrascoPasteurizado(Number(id), req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PostFrascoPasteurizado(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.control.postFrascoPasteurizado(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async GetFrascoPasteurizadoByControlReenvase(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.control.getFrascoPasteurizadoByControlReenvase(Number(id));
            if (data.length === 0) return this.httpResponse.NoContent(res, "no hay datos");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async GetAllFrascosPasteurizados(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.control.getAllFrascosPasteurizados();
            if (data.length === 0) return this.httpResponse.NoContent(res, "No hay pasteurizaciones registradas");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

}