import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import {ParamsDictionary} from 'express-serve-static-core'
import {ParsedQs} from 'qs'
import { KeyCloakService } from "../services";
import { HttpErrors, RedirectRoute, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";

export class keyCloakAdminStrategy implements AuthenticationStrategy{
    name =  "keyCloakAdmin"

    constructor(
        @service(KeyCloakService)
        public servicioKeyCloak:KeyCloakService
    ){}

    async authenticate(request: Request<ParamsDictionary,any,any, ParsedQs,Record<string,any>>):Promise<UserProfile|RedirectRoute|undefined>{
        const token = parseBearerToken(request);

        let perfil:UserProfile;

        if(!token){
            throw new HttpErrors[401]("No existe un toke en la solicitud")
        }

        const usuario = await this.servicioKeyCloak.verificarToken(token)
        if(usuario){
            if(!usuario.active){
                throw new HttpErrors[403]("La sesion no existe o el toke no es valido")
            }
            if(process.env.KEYCLOAK_CLIEN_ID !== undefined){
                if(usuario.resource_access[process.env.KEYCLOAK_CLIEN_ID].roles.indexOf('admin') === -1){
                    throw new HttpErrors[403]("No se cuenta con el permiso para acceder a este servicio.")
                }
            }else{
                throw new HttpErrors[500]("Error interno del servidor, cliente KEYCLOAK no esta definido.")
            }
            perfil = Object.assign({usuario:usuario})
        }else{
            throw new HttpErrors[401]("El token no es valido.")
        }
        return perfil;
    }
}