import { Between, QueryBuilder } from "typeorm";
import { BaseService } from "../config/base.service";
import { ConformidadesFriam017Entity } from "../entities/conformidadesFriam017.entity";
import { AppDataSource } from "../config/data-source";
import { LoteEntity } from "../entities/lote.entity";
import { ControlReenvaseFriam032Entity } from "../entities/controlReenvaseFriam032.entity";
import { SeleccionClasificacionFriam015Entity } from "../entities/seleccionClasificacionFriam015.entity";

export class ConformidadesFriam017Service extends BaseService<ConformidadesFriam017Entity> {
    constructor() {
        super(ConformidadesFriam017Entity);
    }

    async getConformidades(mes: number, anio: number): Promise<ConformidadesFriam017Entity[]> {
        const repository = await this.execRepository;
        const startDate = new Date(anio, mes - 1, 1);
        const endDate = new Date(anio, mes, 0);
        return await repository.find({
            relations: {
                lote: true
            },
            where: {
                fecha: Between(startDate, endDate)
            },
            order: {
                id: 'ASC'
            }
        })
    }

    async getFrascosByLote(lote: number, fecha:string): Promise<any[]> {
        const loteRepository = AppDataSource.getRepository(LoteEntity);
        const controlReenvaseRepository = AppDataSource.getRepository(ControlReenvaseFriam032Entity);
        const seleccionClasificacionRepository = AppDataSource.getRepository(SeleccionClasificacionFriam015Entity);

        const responseLote = await loteRepository.createQueryBuilder("lote")
            .select(["lote.id_lote", "lote.numero_lote", "lote.id_control_reenvase"])
            .where("lote.numeroLote = :lote", { lote })
            .getRawMany();

        let contadores = {
            envase: 0,
            color: 0,
            flavor: 0,
            suciedad: 0,
            muestrasTesteadas: 0,
            muestrasReprobadas: 0
        }
        const responseSeleccion = (await Promise.all(
            responseLote.map((element) =>
                seleccionClasificacionRepository.find({
                    relations: {
                        acidezDornic: true,
                        analisisSensorial: true,
                        controlReenvase:true
                    },
                    where: {
                        controlReenvase: { id: element.id_control_reenvase }
                    },
                    order: {
                        fecha: "ASC",
                    },
                })
            )
        )).filter(result => result.length > 0);

        return responseSeleccion
    }

}