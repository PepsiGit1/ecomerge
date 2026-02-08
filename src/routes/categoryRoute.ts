import { Router } from "express";
import { createCategoryController, getAllCategoryController, getAllCategoryControllerById } from "../controller/Catrgory.controller";

const router = Router();


router.get("/all", getAllCategoryController)
router.get("/:id", getAllCategoryControllerById)
router.post("/create", createCategoryController)

export default router;