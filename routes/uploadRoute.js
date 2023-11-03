import { Router } from "express";
import { uploadFile, getFile } from "../controllers/uploadController.js";

const uploadRouter = Router();

uploadRouter.post('/', uploadFile);
uploadRouter.get('/:id', getFile);

export default uploadRouter;