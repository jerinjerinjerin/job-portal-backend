import { Router } from "express";
import userResolver from "./user.resolver";
import { authMiddleware } from "../../commen/middlewares/auth.middleware";

const router = Router();

router.post("/create", userResolver.create);

router.post("/login", userResolver.login);

router.post("/refresh",userResolver.refresh);

router.get("/current", authMiddleware, userResolver.currentUser);

router.post("/logout",authMiddleware, userResolver.logout);


export default router;
