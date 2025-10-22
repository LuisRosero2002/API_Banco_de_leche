import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { LecheDistribucionFrhos063DTO } from "../DTOs/lecheDistribucionFrhos063.DTO";
import { LecheDistribucionFrhos063Entity } from "../entities/lecheDistribucionFrhos063.entity";

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
}