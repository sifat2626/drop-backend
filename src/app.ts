import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// Initialize dotenv
dotenv.config();

// Create Express app
const app = express();

// Middlewares
app.use(cors({
    origin: [
        "https://shop-smart-1.netlify.app",
        "http://localhost:5173"
    ],
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cookieParser());

// Routes middleware - Dynamically load routes from the "routes" directory
// readdirSync("./routes").map((routeFile: string) =>
//     app.use("/api/v1", require(path.join(__dirname, "routes", routeFile)))
// );

app.get('/', (req: Request, res: Response) => {
    res.send('Hi Next Level Developer !');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});



export default app;
