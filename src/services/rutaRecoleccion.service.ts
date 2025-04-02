import { BaseService } from "../config/base.service";
import { RutaRecoleccionDTO } from "../DTOs/rutaRecolecion.DTO";
import { RutasRecoleccionEntity } from "../entities/rutasRecoleccion.entity";
import { TemperaturaCasasEntity } from "../entities/temperaturaCasas.entity";
import { AppDataSource } from "../config/data-source";
import { TemperaturaCasasDTO } from "../DTOs/temperaturasCasas.DTO";
import { CasasVisitasDTO } from "../DTOs/casasVisitasDTO";
import { CasasVisitasEntity } from "../entities/casasVisitas.entity";
import { FrascosRecolectadosDTO } from "../DTOs/frascosRecolectados.DTO";
import { FrascosRecolectadosEntity } from "../entities/frascosRecolectados.entity";
import { UpdateResult } from "typeorm";

export class RutaRecoleccionService extends BaseService<RutasRecoleccionEntity> {
    constructor() {
        super(RutasRecoleccionEntity);
    }

    async createRutaRecoleccion(body: RutaRecoleccionDTO): Promise<RutasRecoleccionEntity> {
        return (await this.execRepository).save(body);
    }

    async getAllRutasRecoleccion(mes:number,anio:number): Promise<RutasRecoleccionEntity[]> {
        const repository = await this.execRepository;
        const queryBuilder = repository.createQueryBuilder("rr")
            .innerJoin("rr.empleado","em")
            .addSelect([
                "em.id_empleado as idEmpleado",
                "em.nombre as nombreEmpleado",
            ])
            .where("MONTH(rr.fecha_registro) = :mes", { mes })
            .andWhere("YEAR(rr.fecha_registro) = :anio", { anio });

        return await queryBuilder.getRawMany();
    }

    async updateRutaRecoleccion(id: number, body: RutaRecoleccionDTO): Promise<UpdateResult> {
        return (await this.execRepository).update(id, body)
    }

    async createTemperaturaCasas(body: TemperaturaCasasDTO): Promise<TemperaturaCasasEntity> {
        const tCasasRepository = AppDataSource.getRepository(TemperaturaCasasEntity);
        return (await tCasasRepository).save(body);
    }

    async getTemperaturasCasas(id: number): Promise<TemperaturaCasasEntity[] | null> {
        const tCasasRepository = AppDataSource.getRepository(TemperaturaCasasEntity);
        return await tCasasRepository.find({ where: { ruta: { id } } });
    }

    async createCasasVisitas(body: CasasVisitasDTO): Promise<CasasVisitasEntity> {
        const casasVisitasRepository = AppDataSource.getRepository(CasasVisitasEntity);
        return await casasVisitasRepository.save(body);
    }

    async getCasasVisitas(id: number): Promise<CasasVisitasEntity[] | null> {
        const casasVisitasRepository = AppDataSource.getRepository(CasasVisitasEntity);
        return await casasVisitasRepository.find({ where: { ruta: { id } } });
    }

    async createFrascosRecolectados(body: FrascosRecolectadosDTO): Promise<FrascosRecolectadosEntity> {
        const frascosRepository = AppDataSource.getRepository(FrascosRecolectadosEntity);
        return await frascosRepository.save(body);
    }

    async getFrascosRecolectados(id: number): Promise<FrascosRecolectadosEntity[] | null> {
        const frascosRepository = AppDataSource.getRepository(FrascosRecolectadosEntity);
        return await frascosRepository.find({ where: { casaVisita: { id } } });
    }
}