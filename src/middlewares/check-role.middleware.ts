import { Request, Response, NextFunction, RequestHandler } from 'express';
import { PayloadToken } from '../auth/interfaces/jwt.interface';

/**
 * Middleware para verificar que el usuario tenga uno de los roles permitidos
 * @param roles - Array de roles permitidos para acceder a la ruta
 * @returns Middleware de Express
 * 
 * @example
 * // Usar en una ruta para permitir solo administradores
 * router.get('/admin', 
 *   passport.authenticate('jwt', { session: false }), 
 *   checkRole(['Administrador']), 
 *   controller.getAdminData
 * );
 * 
 * @example
 * // Permitir múltiples roles
 * router.get('/dashboard', 
 *   passport.authenticate('jwt', { session: false }), 
 *   checkRole(['Administrador', 'Auxiliar']), 
 *   controller.getDashboard
 * );
 */
export const checkRole = (roles: string[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            // El usuario está disponible en req.user después de la autenticación JWT
            const user = req.user as PayloadToken;

            if (!user) {
                res.status(401).json({
                    success: false,
                    message: 'No autenticado'
                });
                return;
            }

            // Verificar si el rol del usuario está en la lista de roles permitidos
            if (!roles.includes(user.rol)) {
                res.status(403).json({
                    success: false,
                    message: `Acceso denegado. Se requiere uno de los siguientes roles: ${roles.join(', ')}`,
                    userRole: user.rol
                });
                return;
            }

            // El usuario tiene el rol adecuado, continuar
            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al verificar permisos',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
            return;
        }
    };
};

/**
 * Middleware para verificar que el usuario sea administrador
 * Alias para checkRole(['Administrador'])
 */
export const isAdmin = (): RequestHandler => checkRole(['Administrador']);

/**
 * Middleware para verificar que el usuario sea auxiliar
 * Alias para checkRole(['Auxiliar'])
 */
export const isAuxiliar = (): RequestHandler => checkRole(['Auxiliar']);

/**
 * Middleware para verificar que el usuario sea administrador o auxiliar
 * Alias para checkRole(['Administrador', 'Auxiliar'])
 */
export const isAdminOrAuxiliar = (): RequestHandler => checkRole(['Administrador', 'Auxiliar']);
