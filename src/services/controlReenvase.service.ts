import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { ControlReenvaseFriam032Entity } from "../entities/controlReenvaseFriam032.entity";
import { EntradasSalidasFriam012Entity } from "../entities/entradasSalidasFriam012.entity";

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
}