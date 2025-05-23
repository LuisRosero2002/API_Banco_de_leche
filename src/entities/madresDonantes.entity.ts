import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MadresPotencialesEntity } from "./madresPotenciales.entity";
import { HijosMadresEntity } from "./hijosMadres.entity";
import { GestacionEntity } from "./gestacion.entity";
import { ExamenesPrenatalEntity } from "./examenesPrenatal.entity";
import { LaboratoriosEntity } from "./laboratorios.entity";
import { MedicamentosEntity } from "./medicamentos.entity";
import { CasasVisitasEntity } from "./casasVisitas.entity";

export enum donanteType {
    interna = 'interna',
    externa = 'externa',
}
@Entity({name:"madres_donantes_friam_018"})
export class MadresDonantesEntity {
    @PrimaryGeneratedColumn("increment", { name: "id_madre_donante" })
    id!: number;
    @Column({name:"donante_exclusivo", type:"int"})
    donanteExclusivo!:number;
    @Column({name:"tipo_donante", enum: donanteType, type:"enum"})
    tipoDonante!: donanteType;
    @Column({name:"recoleccion_domicilio", type:"int"})
    recoleccionDomicilio!: number;
    @Column({name:"capacitado", type:"varchar"})
    capacitado!:string;
    @Column({name:"recibio_educacion", type:"text"})
    recibioEducacion!:string;
    @Column({name:"donante_apta",type:"int", nullable:true})
    donanteApta!:number;
    @Column({name:"firma_donante",type:"text",nullable:true})
    firmaDonante!:string;
    @Column({name:"firma_profesional",type:"text", nullable:true})
    firmaProfesional!:string;

    @OneToOne(() => MadresPotencialesEntity, MadrePotencial => MadrePotencial.MadreDonante )
    @JoinColumn({name:"id_madre_potencial"})
    madrePotencial!:MadresPotencialesEntity;
    @OneToMany(() => HijosMadresEntity, hijosMadre => hijosMadre.madreDonantes)
    hijosMadre!:HijosMadresEntity[];
    @OneToOne(() => GestacionEntity, gestacion => gestacion.madreDonante)
    gestacion!:GestacionEntity;
    @OneToOne(() => ExamenesPrenatalEntity, examenesPrenatal => examenesPrenatal.madreDonante)
    examenesPrenatal!: ExamenesPrenatalEntity
    @OneToMany(() => LaboratoriosEntity, laboratorio => laboratorio.madreDonante)
    laboratorio!:LaboratoriosEntity[];
    @OneToOne(() => MedicamentosEntity, medicamento => medicamento.madreDonante)
    medicamento!:MedicamentosEntity;
    @OneToMany(() => CasasVisitasEntity, casasVisita => casasVisita.madreDonante)
    casaVisita!:CasasVisitasEntity[];

}