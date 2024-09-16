import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"

export class CallDto {
    @ApiProperty({
        type: String,
        description: "id do cliente que realiza o cadastro"
    })
    @IsString()
    @IsNotEmpty()
    client_id: string;

    @ApiProperty({
        type: String,
        description: "id da ameaça que será cadastrada"
    })
    @IsString()
    @IsNotEmpty()
    threat_id: string;

    @ApiProperty({
        type: String,
        description: "título da ameaça que será cadastrada"
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        type: String,
        description: "id da imagem após o upload"
    })
    @IsString()
    @IsNotEmpty()
    image_id: string;

    @ApiProperty({
        type: String,
        description: "id do município onde o cliente se localiza"
    })
    @IsString()
    @IsNotEmpty()
    municipality_id: string

    @ApiProperty({
        type: String,
        description: "endereço de acordo com as coordenadas"
    })
    @IsString()
    @IsNotEmpty()
    address: string

    @ApiProperty({
        type: String,
        description: "campo de latitude enviado pelo aparelho"
    })
    @IsString()
    @IsNotEmpty()
    latitude: string;

    @ApiProperty({
        type: String,
        description: "campo de longide enviando do aparelho"
    })
    @IsString()
    @IsNotEmpty()
    longitude: string;
}