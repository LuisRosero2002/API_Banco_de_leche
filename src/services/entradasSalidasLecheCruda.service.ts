import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { EntradasSalidasLecheCrudaDTO } from "../DTOs/entradasSalidasLecheCruda.DTO";
import { EntradasSalidasFriam012Entity } from "../entities/entradasSalidasFriam012.entity";

export class EntradasSalidasLecheCrudaService extends BaseService<EntradasSalidasFriam012Entity> {


    constructor(
    ) {
        super(EntradasSalidasFriam012Entity);
    }

    async getEntradasSalidaLecheCruda(mes: number, anio: number): Promise<EntradasSalidasFriam012Entity[]> {
        const repository = await this.execRepository;
        const resultados = repository
            .createQueryBuilder("es")
            .innerJoinAndSelect("es.madreDonante", "md")
            .innerJoinAndSelect("md.madrePotencial", "mp")
            .innerJoinAndSelect("mp.infoMadre", "im")
            .leftJoinAndSelect("md.gestacion", "g")
            .leftJoinAndSelect("es.frascoRecolectado", "fr")
            .leftJoinAndSelect("es.extraccion", "ex")
            .leftJoinAndSelect("fr.congelador", "frcg")
            .leftJoinAndSelect("ex.congelador", "excg")
            .where(
                "(MONTH(ex.fecha_extraccion) = :mes AND YEAR(ex.fecha_extraccion) = :anio) " +
                "OR (MONTH(fr.fecha_de_extraccion) = :mes AND YEAR(fr.fecha_de_extraccion) = :anio)",
                { mes, anio }
            )
            .orderBy("es.id_entradas_salidas");

        return await resultados.getMany();
    }

    async createEntradaSalidaLecheCruda(body: EntradasSalidasLecheCrudaDTO): Promise<EntradasSalidasFriam012Entity> {
        const repository = await this.execRepository;
        const newEntry = repository.create(body);
        return await repository.save(newEntry);
    }

    async putEntradaSalidaLecheCruda(id: number, body: EntradasSalidasLecheCrudaDTO): Promise<UpdateResult> {
        const repository = await this.execRepository;
        return await repository.update(id, body);
    }

    //Prueba
    
}