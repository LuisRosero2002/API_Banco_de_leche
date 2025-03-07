import { UpdateResult } from "typeorm";
import { BaseService } from "../config/base.service";
import { EmpleadosDTO } from "../DTOs/empleados.DTO";
import { EmpleadosEntity } from "../entities/empleados.entity";

export class EmpleadosServices extends BaseService<EmpleadosEntity> {
    constructor() {
        super(EmpleadosEntity)
    }

    async CreateEmpleado(body: EmpleadosDTO): Promise<EmpleadosEntity> {
        console.log("Datos recibidos:", body);
        return (await this.execRepository).save(body);
    }

    // async DeleteEmpleado(id: string): Promise<UpdateResult> {
    //     return (await this.execRepository).update(id, {});
    // }
}