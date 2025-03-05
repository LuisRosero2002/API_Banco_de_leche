import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsuariosEntity } from "./usuarios.entity";

@Entity("sessions")
export class SessionEntity {
    @PrimaryGeneratedColumn("increment",{name:"id_session"})
    id!: number;
    @OneToOne(() => UsuariosEntity, (usuario) => usuario.session)
    @JoinColumn({name:"id_usuario"})
    usuario!:UsuariosEntity
    @Column({type:"text"})
    token!:string
    @CreateDateColumn({
        name:"created_at",
        type:"timestamp",
    })
    createdAt!:Date;
    @UpdateDateColumn({
        name:"update_at",
        type:"timestamp",
    })
    updatedAt!:Date;
}