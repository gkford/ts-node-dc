"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth0_middleware_1 = require("../middleware/auth0.middleware");
const messages_service_1 = require("./messages.service");
exports.messagesRouter = express_1.default.Router();
exports.messagesRouter.get("/public", (req, res) => {
    const message = (0, messages_service_1.getPublicMessage)();
    res.status(200).json(message);
});
exports.messagesRouter.get("/protected", auth0_middleware_1.validateAccessToken, (req, res) => {
    const message = (0, messages_service_1.getProtectedMessage)();
    res.status(200).json(message);
});
exports.messagesRouter.get("/admin", auth0_middleware_1.validateAccessToken, (req, res) => {
    const message = (0, messages_service_1.getAdminMessage)();
    res.status(200).json(message);
});
