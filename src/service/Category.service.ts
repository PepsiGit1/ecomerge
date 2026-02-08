import { PrismaClient } from "../../generated/prisma";
import { Pagination } from "../types/pagination";
import { ICategory } from "../types/product";
const prisma = new PrismaClient();

export const getCategorySevice = async (data: Pagination) => {
    const category = await prisma.category.findMany({
        skip: data.offset * data.limit,
        take: data.limit,
    });
    return category;
}

export const getCategoryServiceById = async (id: string) => {
    const category = await prisma.category.findUnique({
        where: { id: id },
        include: {
            products: true,
            discounts: true
        },
    })
    return category;
}

export const createCategoryService = async (data: ICategory) => {
    const category = await prisma.category.create({
        data: data,
    })
    return category;
}