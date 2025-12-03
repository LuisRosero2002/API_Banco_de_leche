import { Request, Response } from "express";
import { TemperaturaPasteurizadorService } from "../services/temperaturaPasteurizador.service";
import { HttpResponse } from "../shared/responses/http.response";

export class TemperaturaPasteurizadorController {
    constructor(
        private readonly temperaturaService = new TemperaturaPasteurizadorService(),
        private readonly httpResponse = new HttpResponse()
    ) { }

    async getAllTemperaturas(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.temperaturaService.getAllTemperaturas();
            if (data.length === 0) {
                return this.httpResponse.NoContent(res, "No se encontraron registros");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    async createTemperaturaPasteurizador(req: Request, res: Response): Promise<Response> {
    try {
        const data = await this.temperaturaService.createTemperaturaPasteurizador(req.body);
        return this.httpResponse.Ok(res, data);
    } catch (e: any) {
        console.error('Error al crear temperatura pasteurizador:', e);
        
        if (e.message?.includes('Duplicate entry')) {
            return this.httpResponse.Error(res, {
                message: 'Este lote ya está siendo utilizado en otro registro. Seleccione un lote diferente.',
                details: e.message
            });
        }
        
        return this.httpResponse.Error(res, e);
    }
}

    async createCalentamiento(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.temperaturaService.createCalentamiento(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    async createEnfriamiento(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.temperaturaService.createEnfriamiento(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    async updateTemperatura(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const result = await this.temperaturaService.updateTemperatura(Number(id), req.body);
            if (!result.affected) {
                return this.httpResponse.NotFound(res, "No se pudo actualizar el registro.");
            }
            return this.httpResponse.Ok(res, result);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    async updateCalentamiento(req: Request, res: Response) {
        try {
            const calentamientoData = req.body;
            const result = await this.temperaturaService.updateCalentamiento(calentamientoData);

            if (!result.affected) {
                return this.httpResponse.NotFound(res, "No se pudo actualizar el registro de calentamiento.");
            }
            return this.httpResponse.Ok(res, result);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    async updateEnfriamiento(req: Request, res: Response) {
        try {
            const result = await this.temperaturaService.updateEnfriamiento(req.body);
            if (!result.affected) {
                return this.httpResponse.NotFound(res, "No se pudo actualizar el registro de enfriamiento.");
            }
            return this.httpResponse.Ok(res, result);
        } catch (e) {
            return this.httpResponse.Error(res, e);
        }
    }

    async getAllLotesDisponibles(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.temperaturaService.getAllLotesDisponibles();
            if (data.length === 0) {
                return this.httpResponse.NoContent(res, "No se encontraron lotes disponibles");
            }
            return this.httpResponse.Ok(res, data);
        } catch (e) {
            console.error('Error al obtener lotes disponibles:', e);
            return this.httpResponse.Error(res, e);
        }
    }
}
