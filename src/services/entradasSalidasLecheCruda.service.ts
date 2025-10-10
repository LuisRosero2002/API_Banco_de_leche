import { BaseService } from "../config/base.service";
import { EntradasSalidasFriam012Entity } from "../entities/entradasSalidasFriam012.entity";

export class EntradasSalidasLecheCrudaService extends BaseService<EntradasSalidasFriam012Entity> {
    constructor() {
        super(EntradasSalidasFriam012Entity);
    }    

    async getEntradasSalidaLecheCruda(mes: number,anio: number) : Promise<EntradasSalidasFriam012Entity[]>{
        const repository = await this.execRepository;
        const resultados = repository
            .createQueryBuilder("es")
            .innerJoinAndSelect("es.congelador", "c")
            .innerJoinAndSelect("es.madreDonante", "md")
            .innerJoinAndSelect("md.frascosLecheCruda", "flc")
            .innerJoinAndSelect("flc.frascoRecolectado", "fr")
            .innerJoinAndSelect("es.empleadoEntrada", "ee")
            .innerJoinAndSelect("es.empleadoSalida", "esl")
            .where("MONTH(fr.fechaDeExtraccion) = :mes", { mes })
            .andWhere("YEAR(fr.fechaDeExtraccion) = :anio", { anio })
            .orderBy("fr.fechaDeExtraccion", "DESC");
            
        return await resultados.getRawMany();
    }
}