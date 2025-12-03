import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { TemperaturaPasteurizadorDTO } from "../DTOs/temperaturaPasteurizador.dto";
import { CalentamientoDTO } from "../DTOs/calentamiento.dto";
import { EnfriamientoDTO } from "../DTOs/enfriamiento.dto";
import { CalentamientoPasteurizadorEntity } from "../entities/calentamientoPasteurizador.entity";
import { EnfriamientoTemperaturaEntity } from "../entities/enfriamientoTemperatura.entity";
import { TemperaturaPasteurizadorFriam036Entity } from "../entities/temperaturaPasteurizadorFriam036.entity";
import { UpdateResult } from "typeorm";
import { LoteEntity } from "../entities/lote.entity";

export class TemperaturaPasteurizadorService extends BaseService<TemperaturaPasteurizadorFriam036Entity> {
    constructor() {
        super(TemperaturaPasteurizadorFriam036Entity);
    }

    async createTemperaturaPasteurizador(data: TemperaturaPasteurizadorDTO): Promise<TemperaturaPasteurizadorFriam036Entity> {
        const repository = await this.execRepository;
        const newTemperatura = repository.create({
            fecha: data.fecha,
            hora_inicio: data.hora_inicio,
            hora_finalizacio: data.hora_finalizacio,
            observaciones: data.observaciones,
            lote: data.loteId,
            ciclo: data.cicloId,
            responsable: data.responsableId
        });

        return await repository.save(newTemperatura);
    }

    async createCalentamiento(data: CalentamientoDTO[]): Promise<CalentamientoPasteurizadorEntity[]> {
        const calentamientoRepository = AppDataSource.getRepository(CalentamientoPasteurizadorEntity);

        const calentamientoEntities = data.map(c => {
            return calentamientoRepository.create({
                minuto: c.minuto,
                valor: c.valor,
                temperaturaPasteurizador: { id: c.temperaturaPasteurizadorId }
            });
        });

        return await calentamientoRepository.save(calentamientoEntities);
    }

    async createEnfriamiento(data: EnfriamientoDTO[]): Promise<EnfriamientoTemperaturaEntity[]> {
        const enfriamientoRepository = AppDataSource.getRepository(EnfriamientoTemperaturaEntity);

        const enfriamientoEntities = data.map(e => {
            return enfriamientoRepository.create({
                minuto: e.minuto,
                valor: e.valor,
                temperaturaPasteurizador: { id: e.temperaturaPasteurizadorId }
            });
        });

        return await enfriamientoRepository.save(enfriamientoEntities);
    }


    async getAllTemperaturas(): Promise<TemperaturaPasteurizadorFriam036Entity[]> {
        const repository = await this.execRepository;
        return repository.find({
            relations: [
                "lote",
                "ciclo",
                "responsable",
                "calentamientos",
                "enfriamientos"
            ]
        });
    }

    async updateTemperatura(id: number, data: TemperaturaPasteurizadorDTO): Promise<UpdateResult> {
        const repository = await this.execRepository;
        const response = repository.update(id, {
            fecha: data.fecha,
            hora_inicio: data.hora_inicio,
            hora_finalizacio: data.hora_finalizacio,
            observaciones: data.observaciones,
            lote: data.loteId,
            ciclo: data.cicloId,
            responsable: data.responsableId
        });

        return { generatedMaps: [], raw: response, affected: 1 };
    }

    async updateCalentamiento(data: CalentamientoDTO[]): Promise<UpdateResult> {
        const calentamientoRepository = AppDataSource.getRepository(CalentamientoPasteurizadorEntity);
        const updatePromises = data.map((c) => {
            return calentamientoRepository.update(c.id, {
                minuto: c.minuto,
                valor: c.valor,
                temperaturaPasteurizador: { id: c.temperaturaPasteurizadorId }
            });
        });

        const results = await Promise.all(updatePromises);
        const totalAffected = results.reduce((sum, res) => sum + (res.affected || 0), 0);
        return {
            generatedMaps: results.flatMap(res => res.generatedMaps),
            raw: results.flatMap(res => res.raw),
            affected: totalAffected
        };
    }

    async updateEnfriamiento(data: EnfriamientoDTO[]): Promise<UpdateResult> {
        const enfriamientoRepository = AppDataSource.getRepository(EnfriamientoTemperaturaEntity);
        const updatePromises = data.map((e) => {
            return enfriamientoRepository.update(e.id, {
                minuto: e.minuto,
                valor: e.valor,
                temperaturaPasteurizador: { id: e.temperaturaPasteurizadorId }
            });
        });

        const results = await Promise.all(updatePromises);
        const totalAffected = results.reduce((sum, res) => sum + (res.affected || 0), 0);
        return {
            generatedMaps: results.flatMap(res => res.generatedMaps),
            raw: results.flatMap(res => res.raw),
            affected: totalAffected
        };
    }

    async getAllLotesDisponibles(): Promise<{ numeroLote: number; numeroCiclo: number; loteId: number; cicloId: number }[]> {
        const loteRepository = AppDataSource.getRepository(LoteEntity);

        const result = await loteRepository
            .createQueryBuilder('l')
            .innerJoin('l.ciclo', 'c')
            .select([
                'l.numero_lote as numeroLote',
                'c.numero_ciclo as numeroCiclo',
                'l.id as loteId',
                'c.id as cicloId'
            ])
            .orderBy('l.numero_lote', 'ASC')
            .addOrderBy('c.numero_ciclo', 'ASC')
            .getRawMany();

        // Eliminar duplicados usando Map
        const lotesUnicos = new Map<string, any>();

        result.forEach(item => {
            const key = `${item.numeroLote}-${item.numeroCiclo}`;
            if (!lotesUnicos.has(key)) {
                lotesUnicos.set(key, item);
            }
        });

        console.log('Lotes únicos encontrados:', Array.from(lotesUnicos.values())); // Para debug

        return Array.from(lotesUnicos.values()).map(item => ({
            numeroLote: item.numeroLote,
            numeroCiclo: item.numeroCiclo,
            loteId: item.loteId,
            cicloId: item.cicloId
        }));
    }
}