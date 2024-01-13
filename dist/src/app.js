"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
//import userRoute from "./routes/user_route";
//import profileRoute from "./routes/profile_route";
const post_route_1 = __importDefault(require("./routes/post_route"));
//import postInteractionRoute from "./routes/post_interaction_route";
const initApp = () => {
    const promise = new Promise((resolve) => {
        const db = mongoose_1.default.connection;
        db.once("open", () => console.log("Connected to Database"));
        db.on("error", (error) => console.error(error));
        const connectionString = process.env.DB_URL;
        console.log(connectionString);
        mongoose_1.default.connect(connectionString).then(() => {
            const app = (0, express_1.default)();
            app.use(body_parser_1.default.json());
            app.use(body_parser_1.default.urlencoded({ extended: true }));
            //app.use("/user", userRoute);
            //app.use("/profile", profileRoute);
            app.use("/post", post_route_1.default);
            //app.use("/postInteraction", postInteractionRoute);
            resolve(app);
        });
    });
    return promise;
};
exports.default = initApp;
//# sourceMappingURL=app.js.map