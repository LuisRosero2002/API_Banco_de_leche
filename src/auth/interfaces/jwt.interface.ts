export interface PayloadToken {
    sub: string;
    usuario: string;
    rol: string;
    iat?: number;
    exp?: number;
}