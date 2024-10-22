import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class ThreatDto {
    
    @ApiProperty({
        type: String,
        description: 'id da categoria selecionada pelo usuário'
    })
    @IsUUID()
    @IsNotEmpty()
    category_id: string;
    
    @ApiProperty({
        type: String,
        description: 'título da nova ameaça'
    })
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @ApiProperty({
        type: Number,
        description: 'Nível de dano ambiental que pode ser causado'
    })
    @IsNumber()
    @IsNotEmpty()
    threat_level: number;
    
    @ApiProperty({
        type: String,
        description: 'Descrição da emeaça que será exibida no app'
    })
    @IsString()
    @IsNotEmpty()
    description: string;
    
    @ApiProperty({
        type: String,
        description: 'Imagem ilustrativa que será anexada para exibição no app'
    })
    @IsUUID()
    @IsNotEmpty()
    image_id: string;

    @ApiProperty({
        type: String,
        description: 'Id do município a qual o sistema está vinculado'
    })
    @IsUUID()
    @IsNotEmpty()
    municipality_id: string;
}