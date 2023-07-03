import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { REQUIRE_AUTH_ERROR } from '../auth/auth.constants';

export const UserEmail = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest();
	if (!req.user.email) throw new UnauthorizedException(REQUIRE_AUTH_ERROR);
	return req.user.email;
});