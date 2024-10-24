import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsUUID } from "class-validator"
// import { SortOrder } from "../../enum/roles.enum"

let SortOrder: {
    asc: 'asc',
    desc: 'desc'
}

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]

export class CategoryListDto {

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
        type: SortOrder
    })
    @IsString()
    order: SortOrder

    @ApiProperty({
        type: String
    })
    @IsUUID()
    municipality_id: string
}