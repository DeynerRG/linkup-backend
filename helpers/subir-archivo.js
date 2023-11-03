import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import * as url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));


const uploadFileServer = (file) => {


    return new Promise((resolve, reject) => {
        
        // acceso al nombre y extension del archivo
        const nombreCortado = file.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1];

       

        // genera un nombre unico con la funcion de uuidv4
        const nombreTemporalArchivo = `${uuidv4()}.${extension}`;

        // crea el path donde se va guardar el archivo
        const uploadPath = path.join( __dirname, "../uploads/", nombreTemporalArchivo );

        // guarda el archivo en el file system del servidor
        file.mv(uploadPath, function (err) {
            
            if (err) {
                return reject(err)
            }

            resolve(nombreTemporalArchivo);
        });
    });

};

export { uploadFileServer };
