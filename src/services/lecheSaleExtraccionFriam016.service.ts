import { BaseService } from "../config/base.service";
import { AppDataSource } from "../config/data-source";
import { ExtraccionFriam016DTO } from "../DTOs/extraccionFriam016.DTO";
import { lecheSalaExtraccionDTO } from "../DTOs/lecheSalaExtraccion.DTO";
import { ExtraccionFriam016Entity } from "../entities/extraccionFriam016.entity";
import { LecheSalaExtraccionFriam016Entity } from "../entities/lecheSalaExtraccionFriam016.entity";
import { InformacionMadresService } from "./infoMadres.service";
import { MadresPotencialesServices } from "./madresPotenciales.service";

export class LecheSaleExtraccionFriam016Service extends BaseService<LecheSalaExtraccionFriam016Entity> {

    private infoMadresService: InformacionMadresService = new InformacionMadresService();
    private madresPotencialesService: MadresPotencialesServices = new MadresPotencialesServices();

    constructor() {
        super(LecheSalaExtraccionFriam016Entity);
    }

    async postLecheSalaExtraccion(body: lecheSalaExtraccionDTO): Promise<LecheSalaExtraccionFriam016Entity> {
        const repository = await this.execRepository;
        const repositoryInfoMadres = await this.infoMadresService.execRepository;
        const repositoryMadresPotenciales = await this.madresPotencialesService.execRepository;

        const newEntryInfoMadres = repositoryInfoMadres.create({
            nombre: body.nombre,
            apellido: body.apellido,
            fechaNacimiento: body.fechaNacimiento,
            documento: body.documento,
            telefono: body.telefono,
            eps: body.eps,
            ciudad: body.municipio,
        });

        try {
            const responseInfoMadres = await repositoryInfoMadres.save(newEntryInfoMadres);
            const newEntryMadresPotenciales = repositoryMadresPotenciales.create({
                donante_efectiva: 1,
                empleado: { id: 1 },
                entidad: { id: 1 },
                infoMadre: responseInfoMadres
            });
            const responseMadresPotenciales = await repositoryMadresPotenciales.save(newEntryMadresPotenciales);
            const newEntry = repository.create({
                procedencia: body.procedencia,
                consejeria: body.consejeria,
                fechaRegistro: body.fechaRegistro,
                madrePotencial: responseMadresPotenciales
            });
            return await repository.save(newEntry);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async postFrascosExtraccionRecolectados(body: ExtraccionFriam016DTO): Promise<ExtraccionFriam016Entity> {
        const repository = await AppDataSource.getRepository(ExtraccionFriam016Entity);
        const newEntry = repository.create(body);
        return await repository.save(newEntry);
    }

    async getAllLecheSalaExtraccion(): Promise<LecheSalaExtraccionFriam016Entity[]> {
        const repository = await this.execRepository;
        return await repository.find({
            relations: {
                madrePotencial: {
                    infoMadre: true
                },
                extracciones: true
            }
        });
    }

}