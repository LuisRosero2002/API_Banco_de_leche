import { Request, Response } from "express";
import { EntradasSalidasLechePasteurizadaService } from "../services/entradasSalidasLechePasteurizada.service";
import { HttpResponse } from "../shared/responses/http.response";


export class EntradasSalidasFriam013Controller {

    constructor(
        private readonly entradasSalidasPasteurizadaService: EntradasSalidasLechePasteurizadaService = new EntradasSalidasLechePasteurizadaService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) { }

    async getEntradasSalidaLechePasteurizada(req: Request, res: Response): Promise<Response> {
        try {
            const { lote } = req.params;
            const data = await this.entradasSalidasPasteurizadaService.getEntradasSalidasLechePasteurizada(Number(lote));
            if (data.length === 0) return this.httpResponse.NoContent(res, "Data not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }

    async putEntradaSalidaLechePasteurizada(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const body = req.body;
            const data = await this.entradasSalidasPasteurizadaService.putEntradaSalidaLechePasteurizada(Number(id), body);
            if (data.affected === 0) return this.httpResponse.NotFound(res, "ID not found");
            return this.httpResponse.Ok(res, data);
        } catch (error) {
            return this.httpResponse.Error(res, error);
        }
    }



}   