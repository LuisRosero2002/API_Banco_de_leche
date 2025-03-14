
import { UsuariosEntity } from "../../entities/usuarios.entity";
import { AuthService } from "../services/auth.service";
import { PassportUse } from "../utils/passport.use";
import { Strategy as LocalStategy, VerifyFunction} from "passport-local";

const authService: AuthService = new AuthService();

export class LoginStrategy{
    async validate(
        usuario:string,
        password:string,
        done:any
    ):Promise<UsuariosEntity>{
        const user = await authService.ValidateUser(usuario,password);
        if(!user){
            return done(null,false,{message: "Invalid username or password"});
        }

        return done(null,user);
    }   

    get use(){
        return PassportUse<LocalStategy, object, VerifyFunction>(
            "login",
            LocalStategy,
            {
                usernameField: "usuario",
                passwordField: "password"
            },
            this.validate
        );
    }
}