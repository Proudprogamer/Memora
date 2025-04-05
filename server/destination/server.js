"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const db_1 = require("./db");
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_2 = require("./db");
const mongodb_1 = require("mongodb");
const cors_1 = __importDefault(require("cors"));
const JWT_SECRET = "abcdefghijklmnopqrstuvwxyz1234567HDIAUENBAPPOEQUTVML";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/', (req, res) => {
    console.log("home page!");
});
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.usermodel.findOne({ username: username }).then(doc => {
            if (doc != null) {
                if (password == doc.password)
                    next();
                else {
                    res.status(403).json({
                        message: "Wrong email or password"
                    });
                }
            }
        });
    }
    catch (Error) {
        res.status(500).json({
            message: "User not found!"
        });
    }
});
const check_auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.body.username = decoded.username;
        next();
    }
    catch (Error) {
        res.status(411).json({
            message: "Invalid token"
        });
    }
});
app.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = JSON.stringify(req.body);
    let userdata = JSON.parse(data);
    console.log("received request : " + userdata.username + " " + userdata.password);
    const username = userdata.username;
    const password = userdata.password;
    const details = {
        username: username,
        password: password
    };
    const pass_schema = zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string().min(8).max(20).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[\W_]/, "Password must contain at least one special character")
    });
    const user = pass_schema.safeParse(details);
    if (user.success) {
        try {
            yield db_1.usermodel.create({
                username: username,
                password: password
            });
            res.status(200).json({
                message: "user created!"
            });
        }
        catch (Error) {
            res.status(403).json({ message: "User already exists!" });
        }
    }
    else {
        res.status(411).json({ message: "Invalid format in inputs!" });
    }
}));
app.post('/sign-in', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const token = jsonwebtoken_1.default.sign({ username: username }, JWT_SECRET);
    res.status(200).json({
        token: token
    });
}));
app.post('/add-content', check_auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received request body:", req.body);
    console.log("Received token:", req.headers.token);
    const token = req.headers.token;
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log("Decoded token:", decoded);
    }
    catch (err) {
        console.error("JWT verification failed:", err);
        res.status(411).json({ message: "user not verified!" });
        return;
    }
    if (decoded.username == req.body.username) {
        let userdata;
        try {
            userdata = yield db_1.usermodel.findOne({ username: decoded.username });
            console.log("User data:", userdata);
        }
        catch (err) {
            console.error("Error finding user:", err);
            res.status(411).json({ message: "There was an error in finding the user!" });
            return;
        }
        if (userdata) {
            try {
                yield db_2.contentModel.create({
                    username: userdata.username,
                    content: {
                        type: req.body.type,
                        link: req.body.link,
                        title: req.body.title,
                        sub_title: req.body.sub_title,
                        description: req.body.description,
                        tags: req.body.tags
                    }
                });
                console.log("Content added successfully!");
                res.status(200).json({ message: "Content added!" });
            }
            catch (err) {
                console.error("Error adding content:", err);
                res.status(411).json({
                    message: "There was an error in adding content"
                });
            }
        }
    }
    else {
        console.warn("Username in token does not match request body:", decoded.username, req.body.username);
        res.status(411).json({
            message: "user not verified!"
        });
    }
}));
app.get('/fetch-docs', check_auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (decoded.username == req.body.username) {
        const user = yield db_1.usermodel.findOne({ username: decoded.username }).catch(() => {
            res.status(411).json({ message: "There was an error in finding the user!" });
        });
        if (user) {
            const userdata = yield db_2.contentModel.find({ username: user.username }).catch(() => {
                res.status(411).json("There was an error in finding the user content!");
            });
            if (!userdata)
                res.status(411).json({ message: "Content not found!" });
            else {
                res.status(200).json({ message: "Content found", data: userdata });
            }
        }
    }
    else {
        res.status(411).json({
            message: "user not verified!"
        });
    }
}));
app.delete('/delete-doc', check_auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (decoded.username == req.body.username) {
        const id = req.body._id;
        const ob = new mongodb_1.ObjectId(id);
        yield db_2.contentModel.deleteMany({
            _id: ob
        });
        res.status(200).json({ message: "document deleted!" });
    }
    else {
        res.status(411).json({
            message: "user not verified!"
        });
    }
}));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/brainly", {
        serverSelectionTimeoutMS: 30000, // 30 seconds
        socketTimeoutMS: 45000, // 45 seconds
    }).then(() => {
        console.log("database is connected!");
    });
});
app.listen(3000, () => {
    main();
    console.log("app listening on port 3000");
});
