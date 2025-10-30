import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { ControlReenvaseDTO } from "../DTOs/controlReenvase.DTO";
import { FrascosPasteurizadosDTO } from "../DTOs/frascosPasteurizados.DTO";
import { ControlReenvaseFriam032Entity } from "../entities/controlReenvaseFriam032.entity";
import { EntradasSalidasFriam012Entity } from "../entities/entradasSalidasFriam012.entity";
import { FrascosPasteurizadosEntity } from "../entities/frascosPasteurizados.entity";
import { FrascosRecolectadosEntity } from "../entities/frascosRecolectados.entity";
import { ExtraccionFriam016Entity } from "../entities/extraccionFriam016.entity";

export class ControlReenvaseServices extends BaseService<ControlReenvaseFriam032Entity> {
    constructor() {
        super(ControlReenvaseFriam032Entity);
    }

    async getFrascosByMadreDonante(idMadreDonante: number): Promise<EntradasSalidasFriam012Entity[]> {
        const repositoryEntradasSalidas = AppDataSource.getRepository(EntradasSalidasFriam012Entity);
        return await repositoryEntradasSalidas.find({
            relations: {
                extraccion: true,
                frascoRecolectado: true
            },
            where: { madreDonante: { id: idMadreDonante } }
        })
    }

    async getAllControlReenvase(): Promise<ControlReenvaseFriam032Entity[]>{
        const repository = await this.execRepository;
        return await repository.find({
            relations:{
                madreDonante:{
                    casaVisita:{
                        frascoRecolectado:true
                    },
                    madrePotencial:{
                        lecheSalaExtraccion:{
                            extracciones:true
                        }
                    }
                },
                empleado:true,
            }
        })
    }

    async postControlReenvase(data: ControlReenvaseDTO): Promise<ControlReenvaseFriam032Entity>{
        const repository = await this.execRepository;
        return await repository.save(data);
    }

    async putControlReenvase(id: number, data: ControlReenvaseDTO): Promise<UpdateResult>{
        const repository = await this.execRepository;
        if(data.madreDonante.tipoDonante === "externa"){
            const repositoryFrascosExterna = AppDataSource.getRepository(FrascosRecolectadosEntity);
            await repositoryFrascosExterna.update(data.frascoRecolectado,{
                volumen:data.volumen,
            })
        }
        else{
            const repositoryFrascosInterna = AppDataSource.getRepository(ExtraccionFriam016Entity);
            await repositoryFrascosInterna.update(data.extraccion,{
                cantidad:data.volumen,
            })
        }
        return await repository.update(id, data);
    }

    async postFrascoPasteurizado(data: FrascosPasteurizadosDTO): Promise<FrascosPasteurizadosEntity>{
        const repository = AppDataSource.getRepository(FrascosPasteurizadosEntity);
        return await repository.save(data);
    }

    async putFrascoPasteurizado(id: number, data: FrascosPasteurizadosDTO): Promise<UpdateResult>{
        const repository = AppDataSource.getRepository(FrascosPasteurizadosEntity);
        return await repository.update(id, data);
    }

}