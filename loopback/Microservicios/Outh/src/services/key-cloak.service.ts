import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import axios from 'axios';

@injectable({scope: BindingScope.TRANSIENT})
export class KeyCloakService {
  constructor(/* Add @inject to inject parameters */) { }

  async verificarToken(token: any) {
    let respuesta;
    try {
      const params = new URLSearchParams();
      params.append('token', token);
      params.append('client_id', <string>process.env.KEYCLOAK_CLIEN_ID);
      params.append('client_secret', <string>process.env.KEYCLOAK_CLIENT_SECRET);

      const URL = `${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token/introspect`

      const keycloakResponse = await axios.post(
        URL,
        params,
        {
          headers:
            {'Content-Type': 'application/x-www-form-urlencoded'}
        }
      );
      respuesta = keycloakResponse.data;
      return respuesta
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(usuario: string, clave: string) {
    try {
      const params = new URLSearchParams();
      params.append('client_id', <string>process.env.KEYCLOAK_CLIEN_ID);
      params.append('client_secret', <string>process.env.KEYCLOAK_CLIENT_SECRET);
      params.append('grant_type', 'password');
      params.append('username', usuario);
      params.append('password', clave);

      const URL = `${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`

      const keycloakResponse = await axios.post(
        URL,
        params,
        {
          headers:
            {'Content-Type': 'application/x-www-form-urlencoded'}
        }
      );

      return {
        status: "success",
        toke: keycloakResponse.data.access_token,
        refresh_token: keycloakResponse.data.refresh_token
      }

    } catch (error) {
      console.log(error)
      return {
        status: "error",
        type: "login fail",
        content: error.response.data
      }
    }

  }

  async logout(refreshToken: string) {
    try {
      const params = new URLSearchParams();
      params.append('refresh_token', refreshToken);
      params.append('client_id', <string>process.env.KEYCLOAK_CLIEN_ID);
      params.append('client_secret', <string>process.env.KEYCLOAK_CLIENT_SECRET);

      const URL = `${process.env.KEYCLOAK_HOST}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/logout`

      const keycloakResponse = await axios.post(
        URL,
        params,
        {
          headers:
            {'Content-Type': 'application/x-www-form-urlencoded'}
        }
      );
      return {Token: keycloakResponse.data.access_token};
    } catch (error) {
      return {
        status: "error",
        type: "Logout fail",
        content: error.response.data
      };
    }
  }

}
