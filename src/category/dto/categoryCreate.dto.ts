import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CategoryDto {
    // @ApiProperty({
    //     type: String,
    //     description: 'id do usuário logado no momento'
    // })
    // @IsUUID()
    // agent_id: string;
    
    @ApiProperty({
        type: String,
        description: 'título da nova categoria'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: String,
        description: 'id do município ao qual o sistema está vinculado'
    })
    @IsUUID()
    @IsNotEmpty()
    municipality_id: string
}