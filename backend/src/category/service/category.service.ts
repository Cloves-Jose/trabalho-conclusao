import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CategoryDto } from '../dto/categoryCreate.dto';
import { Category } from '../interface/category.interface';
import { CategoryListDto } from '../dto/categoryList.dto';
import { CategoryUpdateDto } from '../dto/categoryUpdate.dto';
import { CategoryDeleteDto } from '../dto/categoryDelete.dto';

@Injectable()
export class CategoryService {

    private deleted_at = new Date()


    constructor(private prisma: PrismaService) {}

    async createCategory(data: CategoryDto): Promise<Category> {
        return this.prisma.tb_category.create({
            data
        })
    }

    async updateCategory(data: CategoryUpdateDto): Promise<Category> {
        return this.prisma.tb_category.update({
            where: {
                id: data.id
            },
            data: {
                title: data.title
            }
        })
    }

    async deleteCategory(data: CategoryDeleteDto): Promise<Category> {
        return this.prisma.tb_category.update({
            where: {
                id: data.id
            },
            data: {
                deleted_at: this.deleted_at.toISOString()
            }
        })
    }

    async findCategoryById(data: CategoryDeleteDto): Promise<Category> {
        return this.prisma.tb_category.findUnique({
            where: {
                id: data.id
            }
        })
    }

    async findCategories(data: CategoryListDto): Promise<Array<Category>> {
        return this.prisma.tb_category.findMany({
            where: {
                municipality_id: data.municipality_id,
                deleted_at: null
            },
            select: {
                id: true,
                title: true,
                municipality_id: true,
                created_at: true,
                updated_at: true,
                deleted_at: true
            },
            skip: data.skip,
            take: data.take,
            orderBy: {
                created_at: data.order,
            }
        })
    }
}
