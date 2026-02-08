import { Request, Response } from "express";
import { PrismaClient } from '../../generated/prisma';
import path from "path";
import fs from 'fs';

const prisma = new PrismaClient();

export const userRequestHandeler = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.error("Error handling user request:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}