import passport from "passport";
import { PayloadToken } from "../interfaces/jwt.interface";
import { AuthService } from "../services/auth.service";
import { PassportUse } from "../utils/passport.use";
import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from "passport-jwt";

export class JwtStrategys extends AuthService {
    constructor() {
        super();
    }

    async validate(payload: PayloadToken, done: (error: any, user?: PayloadToken) => void) {
        return done(null, payload);
    }

    get use() {
        const options: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.getEnviroment("JWT_SECRET")!,
        };

        return PassportUse<JwtStrategy, StrategyOptions, (payload: PayloadToken, done: any) => void>(
            "jwt", 
            JwtStrategy as any,
            options, 
            this.validate
        );
    }
}
