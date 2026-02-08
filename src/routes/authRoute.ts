import { Router } from "express";
import { authLogin, authLogout, authRegister } from "../controller/Auth.controller";


const router = Router();

router.post("/login", authLogin)
router.post("/register", authRegister)
router.post("/logout", authLogout)

export default router;