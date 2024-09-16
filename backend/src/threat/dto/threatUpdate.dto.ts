import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ThreatUpdateDto {

    @ApiProperty({
        type: String,
        description: 'id da ameaça que será atualizada'
    })
    @IsString()
    @IsNotEmpty()
    id: string

    @ApiProperty({
        type: String,
        description: "id da categoria selecionada pelo usuário"
    })
    @IsString()
    @IsNotEmpty()
    category_id: string

    @ApiProperty({
        type: String,
        description: "título da ameaça"
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        type: Number,
        description: 'Nível de dano ambiental que pode ser causado'
    })
    @IsNotEmpty()
    @IsNumber()
    threat_level: number

    @ApiProperty({
        type: String,
        description: 'Descrição da emeaça que será exibida no app'
    })
    @IsNotEmpty()
    @IsString()
    description: string

    @ApiProperty({
        type: String,
        description: 'Imagem ilustrativa que será anexada para exibição no app'
    })
    @IsNotEmpty()
    @IsString()
    image_id: string;
}