import mongoose from "mongoose";
import { uploadFileServer } from "../helpers/subir-archivo.js";
import File from "../models/file.js";
import path from 'path';
import * as url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
import fs from 'fs';


const uploadFile = async(req, res)=>{

    
    // validar que exista archivos en la petición
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg: 'No hay archivos que subir'});
        return;
    }
   
    try {
        const { file } = req.files;
        const filename = await uploadFileServer(file);

        const newFile = new File({filename});
        const fileDb = await newFile.save();
        res.json({
            file: fileDb,
            msg: 'archivo subido correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error al intentar subir el archivo'
        })
    }
};

const getFile = async(req, res)=>{

    const { id } = req.params;

    const isIdValid = mongoose.Types.ObjectId.isValid(id);
    if(!isIdValid){
        return res.status(400).json({msg: 'No es un id de mongodb valido'})
    }

    try {
        
        let file = await File.findById(id);
        
        if(!file){
            return res.status(404).json({msg: `No se encontro un archivo con id ${id}`})
        }


        if(file.filename){

            let name = file.filename;
            const pathFile = path.join(__dirname, '../uploads/', name)
            if( fs.existsSync(pathFile) ){
                
                res.sendFile(pathFile);    
                
                file.num_downloads = file.num_downloads - 1;
                file = await file.save();
                // eliminacion del archivo en el servidor y bd
                if(file.num_downloads <= 0){
                    const name = file.filename;
                    const pathFile = path.join(__dirname, '../uploads', name)
                    
                    // valida si existe el archivo en la ruta especificada
                    if( fs.existsSync(pathFile) ){
                        fs.unlinkSync(pathFile); // eliminacion del archivo
                    };
                    
                    await file.deleteOne();      
                };

                return;
            }

        }
        
       


    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: `Error en el servidor`})
    }
   
};

export {
    uploadFile,
    getFile
}