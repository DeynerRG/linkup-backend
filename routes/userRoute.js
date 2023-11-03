import { Router } from "express";
import { 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser, 
    createUser, 
    login
} from "../controllers/userController.js";
const userRouter = Router();

userRouter.get('/', getUsers);


userRouter.get('/:id', getUserById);


userRouter.post('/', createUser);


userRouter.put('/:id', updateUser);


userRouter.delete('/:id', deleteUser);

userRouter.post('/login', login)



export default userRouter;