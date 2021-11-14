import { Router } from "express";
import { AccountController, AuthController, FuseController, UserController } from "./controllers";

let router = Router();

router.get('/fuse/config', FuseController.Config)

router.post('/auth/login', AuthController.Login)
router.post('/auth/register', AuthController.Register)

router.get('/accounts', AccountController.Get);

router.get('/users', UserController.Get)

/*
 * Author: Laynester
 * © - 2021
 */
export default router;