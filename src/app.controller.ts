import {
  Controller,
  Get,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRoot(
    @Query() query: Record<string, any>,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    // copy original headers
    Object.entries(req.headers).forEach(
      ([header, value]) => {
        res.setHeader(header, value as string);
      },
    );

    // copy original query params
    const queryParams = new URLSearchParams(
      query,
    ).toString();

    return res.redirect(302, `/info?${queryParams}`);
  }
}
