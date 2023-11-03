import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import dbConection from './database/config.js';
import uploadRouter from './routes/uploadRoute.js';
import fileUpload from 'express-fileupload';

const app = express();
const PORT = process.env.PORT || 8080;

// DATABASE CONECTION 
const conection = async()=>{
    await dbConection();
};

conection();
// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// PATHS
const paths = {
    users:       '/api/users',
    uploads:    '/api/upload'
};


app.use(paths.users, userRouter);
app.use(paths.uploads, uploadRouter);

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
});