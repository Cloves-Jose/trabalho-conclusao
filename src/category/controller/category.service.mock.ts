import { PrismaClient } from "@prisma/client";
import { CategoryService } from "../service/category.service";

export const categoryMock = {
    id: "d2c95174-053b-4cb0-9a75-96104a6aa722",
    title: "Enchentes",
    municipality_id: "c0002d78-495a-4dd9-9070-75d1de017909"
}

export const categoryServiceMock = {
    provide: CategoryService,
    useValue: {
        addCategory: jest.fn().mockResolvedValue(categoryMock)
    }
}