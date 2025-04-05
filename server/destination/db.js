"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = exports.usermodel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const contentSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: false },
    content: {
        type: new mongoose_1.Schema({
            type: { type: String, required: true },
            link: { type: String, required: true },
            title: { type: String, required: true },
            sub_title: { type: String, required: true },
            description: { type: String, required: true },
            tags: { type: [String], required: true } // Ensure tags array is required
        }),
        required: true
    }
});
exports.usermodel = (0, mongoose_1.model)("users", userSchema);
exports.contentModel = (0, mongoose_1.model)("content", contentSchema);
