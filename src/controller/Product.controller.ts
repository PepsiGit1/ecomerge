import { IProduct } from './../types/product';
import { Request, Response } from "express";
import { createProductService, deleteProductService, getProductService, getProductServiceById, searchProductService, updateProductService, updateRatingService } from '../service/Product.service';

export const getAllProductController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 10;

        const products = await getProductService({ limit: limit, offset: offset });

        res.status(200).json({
            success: true,
            offset,
            limit,
            count: products.length,
            data: products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const searchProductController = async (req: Request, res: Response): Promise<void> => {
    try {
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 10;
        const query = req.query.q as string | undefined;
        const products = await searchProductService({ limit: limit, offset: offset, query: query })
        res.status(200).json({
            success: true,
            offset,
            limit,
            count: products.length,
            data: products,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

export const getProdcutControllerById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const product = await getProductServiceById(id)
        res.status(200).json({
            success: true,
            data: product,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}


export const createProductController = async (req: Request, res: Response) => {
    try {
        const data: IProduct = req.body;

        const product = await createProductService(data);

        res.status(201).json({
            success: true,
            data: product,
        });
    } catch (error: any) {
        if (error.message === "Category not found") {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const updateProductController = async (req: Request, res: Response) => {
    try {
        const data: IProduct = req.body;
        const id = req.params.id;
        if (id) {
            const product = await updateProductService(id, data);
            res.status(201).json({ success: true, data: product });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        await deleteProductService(id);
        res.status(201).json({ success: true, message: "delete success" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
}

export const updateRatingController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const productId = req.params.productId;
        const { rating } = req.body;

        const updatedRating = await updateRatingService(productId, rating, userId);

        res.status(200).json({
            success: true,
            message: "Rating updated successfully",
            data: updatedRating,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
        });
    }
};