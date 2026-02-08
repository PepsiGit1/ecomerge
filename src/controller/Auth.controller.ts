import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { PrismaClient } from '../../generated/prisma';
const prisma = new PrismaClient()

export const authLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                email: email,
                password: password
            },
        });
        if (!user) {
            res.status(401).json({ success: false, message: "User not found" });
            return;
        }

        if (!user || user.password !== password) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
            return;
        }
        if (!user.isActive) {
            res.status(403).json({
                success: false,
                message: "User is not active"
            });
            return;
        }
        // if (!user.isVerified) {
        //     res.status(403).json({
        //         success: false,
        //         message: "User is not verified"
        //     });
        //     return;
        // }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: user,
                token: token,
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
}

export const authRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, name, phone, address, province, district, image, password, village } = req.body;
        if (!email || !name || !phone || !password) {
            res.status(400).json({
                success: false,
                message: "Email, name, phone, and password are required"
            });
            return;
        }
        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                phone: phone,
                password: password,
                address: address,
                province: province,
                district: district,
                village: village,
                image: image,
                role: "USER",
                isActive: true,
                isVerified: false,
            },
        });

        res.status(201).json({
            success: true,
            message: "User registered. OTP sent to phone.",
            data: user,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const authLogout = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            res.status(400).json({
                success: false,
                message: "User not authenticated"
            });
        }

        // Get current auth status
        const authStatus = await prisma.authStatus.findUnique({ where: { userId } });

        if (!authStatus) {
            res.status(404).json({
                success: false,
                message: "Auth status not found for this user"
            });
        }

        if (authStatus?.isLoggedIn === false) {
            res.status(400).json({
                success: false,
                message: "User is already logged out"
            });
        }

        // Update logout
        const updatedStatus = await prisma.authStatus.update({
            where: { userId },
            data: { isLoggedIn: false, lastLogout: new Date() }
        });

        res.status(200).json({
            success: true,
            message: "Logout successful",
            data: updatedStatus
        });

    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

