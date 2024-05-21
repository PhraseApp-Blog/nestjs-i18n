import {
  Controller,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getRoot(
    @Query() query: Record<string, any>,
    @Res() res: Response,
  ) {
    // copy original query params
    const queryParams = new URLSearchParams(
      query,
    ).toString();

    return res.redirect(302, `/info?${queryParams}`);
  }
}
