import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RawHeaders = createParamDecorator(
  (data: string, ctx: ExecutionContext ) => {

    const req = ctx.switchToHttp().getRequest();
    const rawheaders = req.rawHeaders;

    return ( !data ) ? rawheaders: rawheaders[data]

}) 
  
