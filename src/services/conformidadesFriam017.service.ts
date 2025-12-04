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

    async getFrascosByLote(lote: number, fecha: string): Promise<any> {
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
            acidez: 0,
            muestrasTesteadas: 0,
            muestrasReprobadas: 0
        }
        const responseSeleccion = (await Promise.all(
            responseLote.map((element) =>
                seleccionClasificacionRepository.find({
                    relations: {
                        acidezDornic: true,
                        analisisSensorial: true,
                        controlReenvase: {
                            frascoCrudo: true
                        }
                    },
                    where: {
                        controlReenvase: {
                            id: element.id_control_reenvase,
                            frascoCrudo: { fechaSalida: fecha as any }
                        },
                    },
                    order: {
                        fecha: "ASC",
                    },
                })
            )
        )).filter(result => result.length > 0)

        const flatResponse = responseSeleccion.flat();
        contadores.muestrasTesteadas = flatResponse.length;

        flatResponse.forEach(item => {
            let reprobado = false;

            if (item.analisisSensorial) {
                if (item.analisisSensorial.embalaje === 1) {
                    contadores.envase++;
                    reprobado = true;
                }
                if (item.analisisSensorial.suciedad === 1) {
                    contadores.suciedad++;
                    reprobado = true;
                }
                if (item.analisisSensorial.color === 1) {
                    contadores.color++;
                    reprobado = true;
                }
                if (item.analisisSensorial.flavor === 1) {
                    contadores.flavor++;
                    reprobado = true;
                }
            }

            if (item.acidezDornic && (item.acidezDornic.resultado || 0) > 8) {
                contadores.acidez++;
                reprobado = true;
            }
        });

        contadores.muestrasReprobadas = contadores.envase + contadores.suciedad + contadores.color + contadores.flavor + contadores.acidez;

        return contadores;
    }

}