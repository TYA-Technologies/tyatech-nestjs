import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('rest/auto-call-hosting')
export class AutoCallHostingController {

  constructor() { }

  @Get('auto-call-hosting')
  async AutoCallHosing() {
    console.log('success');
  }
}
