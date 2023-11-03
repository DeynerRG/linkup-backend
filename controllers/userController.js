import User from "../models/user.js";
import { 
    isEmail, 
    isValidUsername, 
    isValidPassword, 
    isEmpty, 
    hashPassword, 
    validatePassword, 
    generarJWT 
} from "../helpers/index.js";


const getUsers = (req, res)=>{


};


const getUserById = (req, res)=>{


};


const createUser = async(req, res)=>{

    const { username='', email='', password='', ...rest } = req.body;
    

    // validacion de campos
    if(isEmpty(username) && isEmpty(email) && isEmpty(password)){
        return res.status(400).json({msg: 'Los campos son obligatorios - username, email, password'});
    }

    if(isValidUsername(username)){
        return res.status(400).json({msg: 'No es un nombre de usuario valido, debe contener al menos 4 caracteres'});
    }

    if(!isEmail(email)){
        return res.status(400).json({msg: 'No es un email valido'});
    }

    if(!isValidPassword(password)){
        return res.status(400).json({msg: 'El password debe contener al menos 8 caracteres'});
    }

    // validar si el usuario existe en la base de datos.
    const userWithUsername = await User.findOne({ username, status: true });
    if(userWithUsername){
        return res.status(400).json({msg: `Ya existe un usuario con el nombre ${username}`});
    }

    // validar si el usuario existe en la base de datos.
    const userWithEmail = await User.findOne({ email, status: true });
    if(userWithEmail){
        return res.status(400).json({msg: `Ya existe un usuario con ${email}`});
    }

    try {
        const newUser = {
            username,
            email,
            password: hashPassword(password)
        }
        const user = new User(newUser);
        await user.save();

        const data = {
            username: user.username,
            email: user.email,
            uid: user._id,
        }
        
        res.json({
            user: data
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo crear el usuario'
        })
    };

};


const updateUser = (req, res)=>{


};


const deleteUser = (req, res)=>{


};


const login = async(req, res)=>{

    const { email='', password='' } = req.body

    if( isEmpty(email) ){
        return res.status(400).json({msg: 'El email es obligatorio'});
    }

    if( isEmpty(password)){
        return res.status(400).json({msg: 'El password es obligatorio'});
    }


    try {
        const existUser = await User.findOne({ email, status: true });
        if(!existUser){
            return res.status(400).json({msg: `No existe un usuario con ${email}`});
        }

        const samePassword = validatePassword(password, existUser.password);
        if(!samePassword){
            return res.status(400).json({msg: `La contraseña es incorrecta`});
        }
  
        const data = {
            username: existUser.username,
            email: existUser.email,
            uid: existUser._id,
        };
        
        const token = await generarJWT(existUser._id);
        res.json({
            user: data,
            token
        });

    } catch (error) {
        res.json(error)
    }  
};


export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login,
}