import { Request, Response } from "express";
import { SeleccionClasificacionServices } from "../services/seleccionClasificacion.service";
import { HttpResponse } from "../shared/responses/http.response";
import { UpdateSeleccionClasificacionDTO } from "../DTOs/seleccionClasificacion.DTO"; 
import { AcidezDornicDTO } from "../DTOs/acidezDornic.DTO";
import { AnalisisSensorialDTO } from "../DTOs/analisisSensorial.DTO";
import { CrematocritoDTO } from "../DTOs/crematocrito.DTO";

export class SeleccionClasificacionController {
    constructor(
        private readonly service: SeleccionClasificacionServices = new SeleccionClasificacionServices(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async GetSeleccionClasificacionPorMesYAnio(req: Request, res: Response): Promise<Response> {
        try {
            const { mes, anio } = req.query;
            const data = await this.service.getSeleccionClasificacionPorMesYAnio(Number(mes), Number(anio));
            if (data.length === 0) return this.httpResponse.NoContent(res, "No hay registros para el mes y año especificados");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async GetAcidezDornicPorSeleccionId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.service.getAcidezDornicPorSeleccionId(Number(id));
            if (!data) return this.httpResponse.NotFound(res, "No se encontró el registro de acidez dornic");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async GetAnalisisSensorialPorSeleccionId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.service.getAnalisisSensorialPorSeleccionId(Number(id));
            if (!data) return this.httpResponse.NotFound(res, "No se encontró el registro de análisis sensorial");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async GetCrematocritoPorSeleccionId(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.service.getCrematocritoPorSeleccionId(Number(id));
            if (!data) return this.httpResponse.NotFound(res, "No se encontró el registro de crematocrito");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PostAcidezDornic(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.service.postAcidezDornic(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PostAnalisisSensorial(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.service.postAnalisisSensorial(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PostCrematocrito(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.service.postCrematocrito(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PutSeleccionClasificacion(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data = await this.service.updateSeleccionClasificacion(Number(id), req.body);
            if (data.affected === 0) return this.httpResponse.NotFound(res, "Error al actualizar la selección y clasificación o no se encontró el registro.");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PutAcidezDornic(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data: AcidezDornicDTO = req.body;
            const result = await this.service.updateAcidezDornic(Number(id), data);
            if (result.affected === 0) return this.httpResponse.NotFound(res, "Error al actualizar la acidez dornic o no se encontró el registro.");
            return this.httpResponse.Ok(res, result);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PutAnalisisSensorial(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data: AnalisisSensorialDTO = req.body;
            const result = await this.service.updateAnalisisSensorial(Number(id), data);
            if (result.affected === 0) return this.httpResponse.NotFound(res, "Error al actualizar el análisis sensorial o no se encontró el registro.");
            return this.httpResponse.Ok(res, result);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async PutCrematocrito(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const data: CrematocritoDTO = req.body;
            const result = await this.service.updateCrematocrito(Number(id), data);
            if (result.affected === 0) return this.httpResponse.NotFound(res, "Error al actualizar el crematocrito o no se encontró el registro.");
            return this.httpResponse.Ok(res, result);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}