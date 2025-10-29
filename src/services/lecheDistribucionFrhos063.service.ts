import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { LecheDistribucionFrhos063DTO } from "../DTOs/lecheDistribucionFrhos063.DTO";
import { LecheDistribucionFrhos063Entity } from "../entities/lecheDistribucionFrhos063.entity";
import { MadresPotencialesEntity } from "../entities/madresPotenciales.entity";
import { AppDataSource } from "../config/data-source";
import { MadresDonantesEntity } from "../entities/madresDonantes.entity";

export class LecheDistribucionFrhos063Service extends BaseService<LecheDistribucionFrhos063Entity> {
    constructor() {
        super(LecheDistribucionFrhos063Entity);
    }

    async postLecheDistribucion(body: LecheDistribucionFrhos063DTO): Promise<LecheDistribucionFrhos063Entity> {
        const repository = await this.execRepository;
        const newEntry = repository.create(body);
        return await repository.save(newEntry);
    }

    async getLecheDistribucion(): Promise<LecheDistribucionFrhos063Entity[]> {
        const repository = await this.execRepository;
        return await repository.find({
            relations: {
                madrePotencial: { infoMadre: true },
                empleado: true
            }
        });
    }

    async putLecheDistribucion(id: number, body: LecheDistribucionFrhos063DTO): Promise<UpdateResult> {
        const repository = await this.execRepository;
        const updatedEntry = await repository.findOneBy({ id });
        if (!updatedEntry) throw new Error("Entry not found");
        return await repository.update(id, body);
    }

    async getMadresInternasNoDonantes(): Promise<MadresPotencialesEntity[]> {
        const repositoryMadresPotenciales = AppDataSource.getRepository(MadresPotencialesEntity);
        return await repositoryMadresPotenciales.createQueryBuilder('mp')
            .leftJoinAndSelect('mp.madreDonante', 'md')
            .innerJoinAndSelect('mp.infoMadre', 'im')
            .where('md.id_madre_potencial IS NULL')
            .orderBy('mp.id_madre_potencial')
            .getMany();
    }
}