import { Request, Response } from "express";
import { ControlMicrobiologicoService } from "../services/controlMicrobiologico.service";
import { HttpResponse } from "../shared/responses/http.response";

export class ControlMicrobiologicoController {
    constructor(
        private readonly controlMicrobiologicoService: ControlMicrobiologicoService = new ControlMicrobiologicoService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()) { }

    /**
     * Get control microbiologico by lote and ciclo
     * Returns frascos with their control data and shared InfoControlMicrobiologico
     */
    async GetControlMicrobiologicoByLoteAndCiclo(req: Request, res: Response): Promise<Response> {
        try {
            const { idLote, idCiclo } = req.params;
            const data = await this.controlMicrobiologicoService.getControlMicrobiologicoByLoteAndCiclo(Number(idLote), Number(idCiclo));

            if (data.frascos.length === 0) {
                return this.httpResponse.NoContent(res, "No hay frascos registrados para este lote y ciclo");
            }

            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    /**
     * Create control microbiologico records
     */
    async PostControlMicrobiologico(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.controlMicrobiologicoService.postControlMicrobiologico(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    /**
     * Update control microbiologico records
     */
    async PutControlMicrobiologico(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.controlMicrobiologicoService.putControlMicrobiologico(req.body);
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }
}
