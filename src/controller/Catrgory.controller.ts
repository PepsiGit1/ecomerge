import { ICategory } from './../types/product';
import { id } from './../../node_modules/effect/src/Fiber';
import { createCategoryService, getCategoryServiceById, getCategorySevice } from "../service/Category.service"
import { Request, Response } from "express";


export const getAllCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const offset = Number(req.query.offset) || 0;
        const limit = Number(req.query.limit) || 10;
        const category = await getCategorySevice({ limit: limit, offset: offset });
        res.status(200).json({
            success: true,
            offset,
            limit,
            count: category.length,
            data: category,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

export const getAllCategoryControllerById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const category = await getCategoryServiceById(id);
        res.status(200).json({
            success: true,
            data: category,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}

export const createCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const data: ICategory = req.body;
        const category = await createCategoryService(data);
        res.status(200).json({
            success: true,
            data: category,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}