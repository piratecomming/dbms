import { Router } from "express";
import addPlace from "../controller/user.controller.addPlace.js"
import { upload } from "../middleware/multer.middleware.js";
import signup from "../controller/user.controller.signup.js"
const router = Router()
router.post('/add',addPlace)
router.post('/login',authentication)
router.post('/signup',signup)
console.log('hello')

export default router;