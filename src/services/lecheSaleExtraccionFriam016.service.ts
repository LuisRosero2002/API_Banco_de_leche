import { UpdateResult } from "typeorm";
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
            console.error('Error en postLecheSalaExtraccion:', error);
            throw error;
        }
    }

    async postFrascosExtraccionRecolectados(body: ExtraccionFriam016DTO): Promise<ExtraccionFriam016Entity> {
        const repository = await AppDataSource.getRepository(ExtraccionFriam016Entity);

        try {
            const newEntry = repository.create({
                cantidad: body.cantidad,
                hora: body.hora,
                gaveta: body.gaveta || 1,
                fechaExtraccion: body.fechaExtraccion,
                motivoConsulta: body.motivoConsulta || '',
                observaciones: body.observaciones || '',
                congelador: { id: body.congelador.id },
                lecheSalaExtraccion: { id: body.lecheSalaExtraccion.id }
            });

            return await repository.save(newEntry);
        } catch (error) {
            console.error('Error en postFrascosExtraccionRecolectados:', error);
            throw error;
        }
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

    async putLecheSalaExtraccion(id: number, body: lecheSalaExtraccionDTO): Promise<UpdateResult> {
        const repository = await this.execRepository;
        const infoMadreRepository = await this.infoMadresService.execRepository;

        const entryToUpdate = await repository.findOne({
            where: { id },
            relations: { madrePotencial: { infoMadre: true } }
        });
        if (!entryToUpdate) throw new Error("Entry not found");

        const infoMadreToUpdate = await infoMadreRepository.findOneBy({
            id: entryToUpdate.madrePotencial.infoMadre.id
        });
        if (!infoMadreToUpdate) throw new Error("Info Madre not found");

        const bodyInfoMadre = infoMadreRepository.create({
            nombre: body.nombre,
            apellido: body.apellido,
            fechaNacimiento: body.fechaNacimiento,
            documento: body.documento,
            telefono: body.telefono,
            eps: body.eps,
            ciudad: body.municipio,
        });

        const bodyLecheSalaExtraccion = repository.create({
            procedencia: body.procedencia,
            consejeria: body.consejeria,
            fechaRegistro: body.fechaRegistro,
        });

        await infoMadreRepository.update(infoMadreToUpdate.id, bodyInfoMadre);
        return await repository.update(id, bodyLecheSalaExtraccion);
    }

    async putFrascosExtraccionRecolectados(id: number, body: ExtraccionFriam016DTO): Promise<UpdateResult> {
        const repository = await AppDataSource.getRepository(ExtraccionFriam016Entity);
        return await repository.update(id, body);
    }
}