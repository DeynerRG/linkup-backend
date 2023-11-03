import bycriptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

const isEmail = (email='')=>{
    const regularExpresion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpresion.test(email);
};

const isValidUsername = (username='')=>{
    return username.length < 4;
};

const isValidPassword = (password='')=>{
    return password.length >= 8;
};

const isEmpty = (string)=>{
    return string.length <= 0;
};

const hashPassword = ( password )=>{

    const salt = bycriptjs.genSaltSync(10);
    const passwordHashed = bycriptjs.hashSync( password, salt  );
    return passwordHashed;

};

const validatePassword = (passwordLogin, passwordDb)=>{
    // el passwordLogin automaticamente es hasheado por bycript 
    // para comparar con  el password que si esta hasheado
    return bycriptjs.compareSync( passwordLogin, passwordDb );
};


const generarJWT = ( uid = '' )=>{

    return new Promise( ( resolve, reject )=>{
        
        const payload = { uid };
        const privateKey = process.env.PRIVATE_KEY_JWT;
        const options = {
            expiresIn: '4h'
        };
        const callback = (error, token)=>{
            if( error ) reject()
            else resolve(token);
        }

        jwt.sign( payload, privateKey, options, callback);
    });
    
};





export {
    isEmail,
    isValidUsername,
    isValidPassword,
    isEmpty,
    hashPassword,
    validatePassword,
    generarJWT,
}