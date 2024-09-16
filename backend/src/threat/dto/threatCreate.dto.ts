import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class ThreatDto {
    
    @ApiProperty({
        type: String,
        description: 'id do usuário logado no momento'
    })
    @IsString()
    agent_id: string;
    
    @ApiProperty({
        type: String,
        description: 'id da categoria selecionada pelo usuário'
    })
    @IsString()
    category_id: string;
    
    @ApiProperty({
        type: String,
        description: 'título da nova ameaça'
    })
    @IsString()
    title: string;
    
    @ApiProperty({
        type: Number,
        description: 'Nível de dano ambiental que pode ser causado'
    })
    @IsNumber()
    threat_level: number;
    
    @ApiProperty({
        type: String,
        description: 'Descrição da emeaça que será exibida no app'
    })
    @IsString()
    description: string;
    
    @ApiProperty({
        type: String,
        description: 'Imagem ilustrativa que será anexada para exibição no app'
    })
    @IsString()
    image_id: string;

    @ApiProperty({
        type: String,
        description: 'Id do município a qual o sistema está vinculado'
    })
    @IsUUID()
    municipality_id: string;
}