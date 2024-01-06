"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
let AuthMiddleware = class AuthMiddleware {
    async use(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const isValidToken = this.validateToken(token);
            if (!isValidToken) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req['user'] = this.getUserByToken(token);
            next();
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    validateToken(token) {
        return token.split(" ")[1].split(":").length === 4;
    }
    getUserByToken(token) {
        let tokenParts = token.split(" ")[1].split(":");
        return { id: tokenParts[0], name: tokenParts[1], role: tokenParts[2] };
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map