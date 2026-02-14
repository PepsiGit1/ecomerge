import { Router } from "express";
import { createProductController, deleteProductController, getAllProductController, getProdcutControllerById, updateProductController, updateRatingController } from "../controller/Product.controller";


const router = Router();

router.get("/all", getAllProductController),
    router.get("/:id", getProdcutControllerById),
    router.post("/create", createProductController)
router.put("/update/:id", updateProductController)
router.delete("/delete/:id", deleteProductController)
router.put("/:productId/rating/:userId", updateRatingController)

export default router;