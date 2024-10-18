"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
// Server port
const port = parseInt(process.env.PORT, 10) || 8000;
// Connect to DB and start server
mongoose_1.default
    .connect(process.env.DATABASE)
    .then(() => {
    app_1.default.listen(port, () => {
        console.log(`Server Running on port ${port}`);
    });
})
    .catch((err) => console.log(err));
// function bootstrap(){
//     app.listen(port, () => {
//             console.log(`Server Running on port ${port}`);
//         });
// }
// bootstrap();
