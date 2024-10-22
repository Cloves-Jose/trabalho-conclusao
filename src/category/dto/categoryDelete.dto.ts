import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class CategoryDeleteDto {
    
    @ApiProperty({
        type: String,
        description: 'id da categoria que será deletada'
    })
    @IsUUID()
    @IsNotEmpty()
    id: string
}