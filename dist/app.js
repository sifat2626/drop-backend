"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Initialize dotenv
dotenv_1.default.config();
// Create Express app
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: [
        "https://shop-smart-1.netlify.app",
        "http://localhost:5173"
    ],
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
// Routes middleware - Dynamically load routes from the "routes" directory
// readdirSync("./routes").map((routeFile: string) =>
//     app.use("/api/v1", require(path.join(__dirname, "routes", routeFile)))
// );
app.get('/', (req, res) => {
    res.send('Hi Next Level Developer !');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});
exports.default = app;
