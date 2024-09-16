import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CategoryDto {
    @ApiProperty({
        type: String,
        description: 'id do usuário logado no momento'
    })
    @IsUUID()
    agent_id: string;
    
    @ApiProperty({
        type: String,
        description: 'título da nova categoria'
    })
    @IsString()
    title: string;

    @ApiProperty({
        type: String,
        description: 'id do município ao qual o sistema está vinculado'
    })
    @IsUUID()
    municipality_id: string
}