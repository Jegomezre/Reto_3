import Perfil from "App/Models/Perfil";
import { AuthenticationException } from "@adonisjs/auth/build/standalone";

class Administrador{
    async handle({auth}, next){
        const user = await auth.user.perfil
        const perfil = await Perfil.findOrFail(user)
        if (perfil.descripcionPerfil != 'Administrador') {
            throw new AuthenticationException('No tiene permisos para esta accion', 'E_UNAUTHORIZED_ACCESS', 'unauthorized')
        }
        else{
            await next()
        }
    }
}
module.exports = Administrador
