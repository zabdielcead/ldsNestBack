import { ApiProperty } from "@nestjs/swagger";
export class UserDto {



    @ApiProperty({
        type: 'string',
        name: 'email',
        description: 'email usuario'
    })
    email: string;

    @ApiProperty({
        type: 'string',
        name: 'pass',
        description: 'pass usuario'
    })
    pass: string;

    @ApiProperty({
        type: 'string',
        name: 'idUsuario',
        description: 'idUsuario'
    })
    idUsuario: string;

    constructor (email: string, pass:string, idUsuario: string) {
        this.email = email; 
        this.pass  = pass;
        this.idUsuario = idUsuario;
     }
}