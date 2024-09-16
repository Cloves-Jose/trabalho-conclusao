import { Controller, ValidationPipe, Body, Post, Get, Put, Delete, UseGuards } from '@nestjs/common';
import { CategoryDto } from '../dto/categoryCreate.dto';
import { Category } from '../interface/category.interface';
import { CategoryService } from '../service/category.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryListDto } from '../dto/categoryList.dto';
import { CategoryUpdateDto } from '../dto/categoryUpdate.dto';
import { CategoryDeleteDto } from '../dto/categoryDelete.dto';
import { AuthGuard } from '../../auth/guard/auth.guard';

@ApiTags('Rotas para regras do crud de categorias')
@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {}

    @UseGuards(AuthGuard)
    @ApiBody({ type: [CategoryDto] })
    @ApiOperation({ summary: 'Efetua a criação de uma nova categoria de ameaça' })
    @ApiResponse({ status: 201, description: 'Success.' })
    @Post()
    async createCategory(@Body(new ValidationPipe()) category: CategoryDto): Promise<Category> {
        return this.categoryService.createCategory(category)
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: [CategoryListDto] })
    @ApiOperation({ summary: 'Exibe a listagem de categorias paginada' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Get()
    async listCategory(@Body(new ValidationPipe()) data: CategoryListDto): Promise<Array<Category>> {
        return this.categoryService.findCategories(data)
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: [CategoryDeleteDto] })
    @ApiOperation({ summary: 'Retorna as informações da categoria de acordo com o id' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Get('id')
    async findCategoryById(@Body(new ValidationPipe()) category: CategoryDeleteDto): Promise<Category> {
        return this.categoryService.findCategoryById(category)
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: [CategoryDeleteDto] })
    @ApiOperation({ summary: 'Deleta a categoria selecionada' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Delete()
    async deleteCategory(@Body(new ValidationPipe()) category: CategoryDeleteDto): Promise<Category> {
        return this.categoryService.deleteCategory(category)
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: [CategoryUpdateDto] })
    @ApiOperation({ summary: 'Atualiza o título da categoria selecionada' })
    @ApiResponse({ status: 200, description: 'Success.' })
    @Put()
    async updateCategory(@Body(new ValidationPipe()) category: CategoryUpdateDto): Promise<Category> {
        return this.categoryService.updateCategory(category)
    }
}
