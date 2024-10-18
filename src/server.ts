import mongoose from "mongoose";
import app from './app'

// Server port
const port: number = parseInt(process.env.PORT as string, 10) || 8000;

// Connect to DB and start server
mongoose
    .connect(process.env.DATABASE as string)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Running on port ${port}`);
        });
    })
    .catch((err: Error) => console.log(err));

// function bootstrap(){
//     app.listen(port, () => {
//             console.log(`Server Running on port ${port}`);
//         });
// }

// bootstrap();