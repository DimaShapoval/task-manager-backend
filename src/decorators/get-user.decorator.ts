import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../domains/user/entity/user.entity";

export const getUser = createParamDecorator(
  (ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);