import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express'
import { jwtConstants } from "../constants";
import { RolePlatform } from "../../enum/roles.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request);

        if(token == undefined) {
            throw new UnauthorizedException()
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
            if (payload.permission === RolePlatform.WEB) {
                request['user'] = payload
            } else {
                throw new UnauthorizedException()
            }

        } catch {
            throw new UnauthorizedException();
        }
        
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}