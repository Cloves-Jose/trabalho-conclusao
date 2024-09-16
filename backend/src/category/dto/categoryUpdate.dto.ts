import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CategoryUpdateDto {
    
    @ApiProperty({
        type: String,
        description: 'id da categoria que será atualizada'
    })
    @IsString()
    @IsNotEmpty()
    id: string

    @ApiProperty({
        type: String,
        description: "único campo que poderá ser atualizada"
    })
    @IsString()
    @IsNotEmpty()
    title: string
}