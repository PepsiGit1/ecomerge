import { PrismaClient } from "../../generated/prisma";
import { Pagination, QueryProduct } from "../types/pagination";
import { IProduct } from "../types/product";

const prisma = new PrismaClient();

export const createProductService = async (
    data: IProduct
) => {
    if (data.categoryId) {
        const category = await prisma.category.findUnique({
            where: { id: data.categoryId },
        });

        if (!category) {
            throw new Error("Category not found");
        }
    }

    const product = await prisma.product.create({
        data,
    });

    return product;
};

export const updateProductService = async (
    id: string,
    data: IProduct
) => {
    const findProductId = await prisma.product.findUnique({
        where: { id },
    });

    if (!findProductId) {
        throw new Error("Product not found");
    }
    if (data.categoryId) {
        const category = await prisma.category.findUnique({
            where: { id: data.categoryId },
        });

        if (!category) {
            throw new Error("Category not found");
        }
    }
    const product = await prisma.product.update({
        where: {
            id: id
        },
        data: data
    })
    return product;

}

export const deleteProductService = async (id: string) => {
    const product = await prisma.product.delete({
        where: {
            id: id
        }
    })
    return product
}

export const getProductService = async (data: Pagination) => {
    const where: QueryProduct = {};
    if (data.query) {
        where.name = {
            contains: data.query,
            mode: "insensitive",
        };
    }
    if (data.from || data.to) {
        where.createdAt = {};
        if (data.from) {
            where.createdAt.gte = new Date(data.from);
        }
        if (data.to) {
            where.createdAt.lte = new Date(data.to);
        }
    }

    const product = await prisma.product.findMany({
        where: where,
        skip: data.offset * data.limit,
        take: data.limit,
        orderBy: { createdAt: "desc" },
    });
    return product;
};

export const getProductServiceById = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        throw new Error("Product not found");
    }

    const similarProducts = await prisma.product.findMany({
        where: {
            id: { not: id },
            categoryId: product.categoryId,
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 6,
    });

    return {
        product,
        similarProducts,
    };
};


export const updateRatingService = async (
    productId: string,
    rating: number,
    userId: string
) => {
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }

    // Check if product exists
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error(`Product with id ${productId} not found`);

    // Upsert user rating
    await prisma.productRating.upsert({
        where: {
            userId_productId: { userId, productId },
        },
        update: { rating },
        create: { userId, productId, rating },
    });

    // Recalculate rating and ratingCount
    const ratings = await prisma.productRating.findMany({
        where: { productId },
        select: { rating: true },
    });

    const ratingCount = ratings.length;
    const avgRating =
        ratings.reduce((sum, r) => sum + r.rating, 0) / ratingCount;

    // Update product with new average and count
    const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: {
            rating: avgRating,
            ratingCount,
        },
    });

    return updatedProduct;
};