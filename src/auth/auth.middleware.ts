import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  async use(req: Request, res: Response, next: NextFunction) {
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
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  private validateToken(token: string){
    return token.split(" ")[1].split(":").length===4;
  }

  private getUserByToken(token: string){
    let tokenParts = token.split(" ")[1].split(":");
    return {id: tokenParts[0], name: tokenParts[1], role: tokenParts[2]};
  }
}
