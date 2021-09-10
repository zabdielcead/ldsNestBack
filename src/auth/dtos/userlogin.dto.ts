import { ApiProperty } from "@nestjs/swagger";
export class UserLoginDto {



    @ApiProperty({
        type: 'string',
        name: 'email',
        description: 'email usuario'
    })
    email: string;

    @ApiProperty({
        type: 'string',
        name: 'jwt',
        description: 'pass usuario'
    })
    jwt: string;

    @ApiProperty({
        type: 'string',
        name: 'idUsuario',
        description: 'idUsuario'
    })
    idUsuario: string;

    constructor (email: string, jwt:string, idUsuario: string) {
        this.email = email; 
        this.jwt  = jwt;
        this.idUsuario = idUsuario;
     }
}