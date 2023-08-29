import { Controller, Get, HttpCode, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { Request } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HttpCode(200)
  getHello(@Req() req: Request): {} {
    return this.appService.getHello();
  }
}
