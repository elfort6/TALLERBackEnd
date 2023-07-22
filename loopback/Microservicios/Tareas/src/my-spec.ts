import { ValueOrPromise, injectable } from "@loopback/core";
import { OASEnhancer, OpenAPIObject, OpenApiSpec, asSpecEnhancer, mergeOpenAPISpec, mergeSecuritySchemeToSpec } from "@loopback/rest";


@injectable(asSpecEnhancer)
export class JwtAuthSpecEnhancer implements OASEnhancer{
    name = 'Consulta'

    modifySpec(spec: OpenAPIObject):OpenApiSpec{
        const securitySchemeSpec = mergeSecuritySchemeToSpec(spec,'Token',{
            type:'http',
            scheme:'bearer',
            bearerFormat: 'JWT'
        });
        const securitySpec = mergeOpenAPISpec(securitySchemeSpec,{
            security:[
                {
                    token:[]
                }
            ]
        });
        return securitySpec;        
    }
}