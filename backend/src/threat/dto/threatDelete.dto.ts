import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ThreatDeleteDto {

    @ApiProperty({
        type: String,
        description: 'id da categoria que será deletada'
    })
    @IsString()
    @IsNotEmpty()
    id: string
}