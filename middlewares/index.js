
const validarJWT = async(req, res, next)=>{
    // acceso al header de la peticion el cual contiene el token de acceso
    // .header('nombre_header') devuelve el header recibido en la petición
    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    };

    try {
        // Validar el jwt
        // payload es el contenido del token
        const payload = jwt.verify(token, process.env.PRIVATE_KEY_JWT );
        const { uid } = payload;

        // leer el usuario con el uid recibido en la req
        const usuario = await Usuario.findById(uid);

        // validar que exista el usuario
        if(!usuario){
            return res.status(404).json({
                msg: 'Token no valido - usuario no existe en BD'
            })
        }

        // validar que el usuario no haya sido eliminado (estado: true)
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            })
        }



        req.usuario = usuario;
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
    next(); // permite continuar al sig. middleware o controlador
};