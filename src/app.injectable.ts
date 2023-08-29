import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const skipAuth = this.reflector.get<boolean>(
      "skipAuth",
      context.getHandler()
    );
    if (skipAuth) {
      //check xem có phải api bỏ qua xác thực thông qua @SkipAuthGuard()
      return true;
    } else {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization;
      return token !== undefined;
    }
  }
}
