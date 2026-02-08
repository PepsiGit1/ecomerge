import { User } from "../generated/prisma"; // adjust path to your Prisma User type

declare global {
    namespace Express {
        interface Request {
            user?: User; // optional, populated by auth middleware
        }
    }
}
