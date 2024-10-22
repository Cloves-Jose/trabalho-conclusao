import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CallDeleteDto {
    @ApiProperty({
        type: String,
        description: 'id do chamado que será deletado'
    })
    @IsNotEmpty()
    @IsString()
    id: string;
}