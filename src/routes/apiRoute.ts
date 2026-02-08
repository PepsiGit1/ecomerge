import express from 'express';
import authRoute from './authRoute';
import products from './productRoute';
import category from './categoryRoute';


const router = express.Router();

router.get('/version', (req, res) => {
    res.status(200).json({
        version: '1.0.0',
        name: 'ODG PAGEING',
    });
});

router.use("/auth", authRoute)
router.use("/product", products)
router.use("/category", category)

export default router;