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

    async getAllRutasRecoleccion(mes: number, anio: number): Promise<RutasRecoleccionEntity[]> {
        const repository = await this.execRepository;
        const queryBuilder = repository.createQueryBuilder("rr")
            .innerJoin("rr.empleado", "em")
            .select([
                "rr.id_ruta AS id_ruta",
                "rr.fecha_registro AS fecha_registro",
                "rr.jornada AS jornada",
                "rr.nombre_conductor AS nombre_conductor",
                "rr.placa_vehiculo AS placa_vehiculo",
                "rr.kilometraje_inicial AS kilometraje_inicial",
                "rr.kilometraje_final AS kilometraje_final",
                "rr.hora_salida AS hora_salida",
                "rr.hora_llegada AS hora_llegada",
                "rr.temperatura_llegada AS temperatura_llegada",
                "rr.temperatura_salida AS temperatura_salida",
                "rr.total_visitas AS total_visitas",
                "rr.volumen_total AS volumen_total",
                "rr.id_empleado AS id_empleado",
                "em.nombre AS nombreEmpleado",
                "em.cargo AS cargo"
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
        return await casasVisitasRepository.createQueryBuilder("c")
            .innerJoin("c.madreDonante", "md")
            .innerJoin("md.madrePotencial", "mp")
            .innerJoin("mp.infoMadre", "im")
            .select([
                "md.id_madre_donante AS id_madre_donante",
                "c.id_casa_visita AS id_casa_visita",
                "c.id_ruta AS id_ruta",
                "c.observacion AS observacion",
                "im.id_info_madre AS id_info_madre",
                "im.nombre AS nombre",
                "im.apellido AS apellido",
                "im.direccion AS direccion",
                "im.celular AS celular"
            ])
            .where("c.id_ruta = :id", { id })
            .getRawMany();
    }

    async createFrascosRecolectados(body: FrascosRecolectadosDTO): Promise<FrascosRecolectadosEntity> {
        const frascosRepository = AppDataSource.getRepository(FrascosRecolectadosEntity);
        return await frascosRepository.save(body);
    }

    async getFrascosRecolectados(id: number): Promise<FrascosRecolectadosEntity[] | null> {
        const frascosRepository = AppDataSource.getRepository(FrascosRecolectadosEntity);
        return await frascosRepository.createQueryBuilder("fr")
            .innerJoin("fr.congelador", "c")
            .innerJoin("fr.casaVisita", "cv")
            .select([
                "fr.id_frascos_recolectados AS id_frascos_recolectados",
                "fr.volumen AS volumen",
                "fr.fecha_de_extraccion AS fecha_de_extraccion",
                "fr.termo AS termo",
                "fr.gaveta AS gaveta",
                "c.id_congelador AS id_congelador",
                "c.descripcion AS descripcion"
            ])
            .where("fr.casaVisita = :id", { id })
            .getRawMany();
    }
}