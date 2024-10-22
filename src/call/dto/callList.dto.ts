import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

let SortOrder: {
    asc: 'asc',
    desc: 'desc'
}

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]

export class CallListDto {
    @ApiProperty({
        type: Number
    })
    @IsNumber()
    skip: number
    @ApiProperty({
        type: Number
    })
    @IsNumber()
    take: number
    @ApiProperty({
        type: String
    })
    @IsString()
    cursor: string
    @ApiProperty({
        type: SortOrder
    })
    @IsString()
    order: SortOrder
}