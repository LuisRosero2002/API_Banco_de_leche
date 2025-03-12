import { ConfigServer } from "../../config/config.server";
import { UsuariosService } from "../../repository/usuarios.service";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UsuariosEntity } from "../../entities/usuarios.entity";

export class AuthService extends ConfigServer{
    constructor(
        private readonly userServices: UsuariosService = new UsuariosService(),
        private readonly jwtServices = jwt
    ){
        super()
    }

    async ValidateUser(username:string,  password:string):Promise<UsuariosEntity | undefined | null>{
        const userByUsername = await this.userServices.FindUserbyUsername(username);
        if(userByUsername){
            const isMatch = await bcrypt.compare(password,userByUsername.password);
            if (isMatch) {
                return userByUsername;
            }
        }
        return null;
    }

    sing(payload:jwt.JwtPayload,secret:any){
        return this.jwtServices.sign(payload,secret);
    }

    async generateJWT(user:UsuariosEntity):Promise<{accessToken:string; user:UsuariosEntity}>{
        const userConsult = await this.userServices.FindUserByID(user.id);
        const payload = {
            sub: userConsult!.id.toString()
        }
        if(userConsult){
            user.password = "Not permision";
        }
        return {
            accessToken: this.sing(payload,this.getEnviroment('JWT_SECRET')),
            user
        }
    }  
}