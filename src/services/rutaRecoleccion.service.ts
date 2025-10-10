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
import { CongeladorEntity } from "../entities/congelador.entity";
import { TemperaturasRutasEntity } from "../entities/temperaturasRutas.entity";
import { TemperaturasRutasDTO } from "../DTOs/temperaturasRuta.DTO";
import { EntradasSalidasFriam012Entity } from "../entities/entradasSalidasFriam012.entity";

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

    async getRutaRecoleccionById(id: number): Promise<RutasRecoleccionEntity | null> {
        return (await this.execRepository).findOne({ where: { id } });
    }

    async createTemperaturaCasas(body: TemperaturaCasasDTO): Promise<TemperaturaCasasEntity | UpdateResult> {
        const tCasasRepository = AppDataSource.getRepository(TemperaturaCasasEntity);
        const auxBody = {
            numeroCasa: body.numeroCasa,
            temperatura: body.temperatura,
            ruta: body.ruta,
            caja: body.caja
        };
        const res = (await this.execRepository).update(
            { id: body.ruta.id },
            {
                horaSalida: body.horaSalida || "",
                horaLlegada: body.horaLlegada || ""
            }
        );

        if (body.id === null && auxBody.temperatura != null) {
            return (await tCasasRepository).save(auxBody);
        }
        return res;
    }

    async getTemperaturasCasas(id: number): Promise<TemperaturaCasasEntity[] | null> {
        const tCasasRepository = AppDataSource.getRepository(TemperaturaCasasEntity);
        const queryBuilder = tCasasRepository.createQueryBuilder("tem")
            .where("tem.ruta = :id", { id })
            .getMany();
        return await queryBuilder;
    }

    async updateTemperaturaCasas(id: number, body: TemperaturaCasasDTO): Promise<UpdateResult> {
        const repository = await this.execRepository;
        const tCasasRepository = AppDataSource.getRepository(TemperaturaCasasEntity);
        const auxBody = {
            numeroCasa: body.numeroCasa,
            temperatura: body.temperatura,
            ruta: body.ruta,
            caja: body.caja
        };
        const res = await repository.update(
            { id: body.ruta.id },
            {
                horaSalida: body.horaSalida || "",
                horaLlegada: body.horaLlegada || ""
            }
        );
        if (body.id != null) {
            return await tCasasRepository.update(id, auxBody);
        } else {
            return res;
        }
    }

    async updateTemperaturaCasasByCasaAndRuta(numeroCasa: number, rutaId: number, temperatura: number): Promise<UpdateResult> {
        const tCasasRepository = AppDataSource.getRepository(TemperaturaCasasEntity);
        return await tCasasRepository.update(
            { numeroCasa, ruta: { id: rutaId } },
            { temperatura }
        );
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
                "c.numero_casa AS numero_casa",
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
        const entradasSalidasRepository = AppDataSource.getRepository(EntradasSalidasFriam012Entity);

        const resultado = await frascosRepository.save(body);

        const bodyFrascosLecheCruda = {
            madreDonante: body.madreDonante,
            frascoRecolectado: resultado
        };
        const bodyEntradasSalidas = {
            congelador: body.congelador,
            madreDonante: body.madreDonante.id,
            fechaVencimiento: new Date(new Date().setDate(new Date().getDate() + 30)),
            fechaEntrada: new Date(),
            fechaSalida: new Date(),
            empleadoEntrada: 1,
            empleadoSalida: 1
            
        }
        return resultado;
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

    async getCongeladores(): Promise<any[]> {
        const congeladoresRepository = AppDataSource.getRepository(CongeladorEntity);
        return await congeladoresRepository.find();
    }

    async updateCasas(id: number, body: CasasVisitasDTO): Promise<UpdateResult> {
        const casasVisitasRepository = AppDataSource.getRepository(CasasVisitasEntity);
        return (await casasVisitasRepository).update(id, body);
    }

    async updateFrascos(id: number, body: FrascosRecolectadosDTO): Promise<UpdateResult> {
        const frascosRepository = AppDataSource.getRepository(FrascosRecolectadosEntity);
        return (await frascosRepository).update(id, body);
    }

    async createTemperaturaRuta(body: TemperaturasRutasDTO): Promise<TemperaturasRutasEntity> {
        const temperaturasRutasRepository = AppDataSource.getRepository(TemperaturasRutasEntity);
        return await temperaturasRutasRepository.save(body);
    }

    async getTemperaturaRuta(id: number): Promise<TemperaturasRutasEntity[] | null> {
        const temperaturasRutasRepository = AppDataSource.getRepository(TemperaturasRutasEntity);
        return await temperaturasRutasRepository.find({ where: { ruta: { id } } });
    }

    async updateTemperaturaRuta(id: number, body: TemperaturasRutasDTO
    ): Promise<UpdateResult> {
        const repo = AppDataSource.getRepository(TemperaturasRutasEntity);
        const { opt, ...data } = body;
        return repo.update(
            { id },
            data
        );
    }

}