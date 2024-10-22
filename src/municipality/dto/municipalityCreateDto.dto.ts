import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class MunicipalityDto {
    
    @ApiProperty({
        type: String,
        description: "Nome do município que será cadastrado."
    })
    @IsNotEmpty()
    @IsString()
    municipality_name: string

    @ApiProperty({
        type: String,
        description: "CNPJ do município"
    })
    @IsNotEmpty()
    @IsString()
    cnpj: string

    @ApiProperty({
        type: String,
        description: "Nome do estado que a qual o município pertence"
    })
    @IsNotEmpty()
    @IsString()
    state_name: string
}