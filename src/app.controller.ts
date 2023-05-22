import { Controller, Get, HttpCode, HttpService, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { interval } from "rxjs";
import { Request } from "express";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly http: HttpService
  ) {}

  @Get()
  @HttpCode(200)
  getHello(@Req() req: Request): {} {
   /*  const baseUrl = `${req.protocol}://${req.get("host")}`;
    interval(3*60*1000).subscribe(() => {      
      this.http
        .get(`${baseUrl}/rest/auto-call-hosting/auto-call-hosting`)
        .toPromise();
    }); */
    return this.appService.getHello();
  }
}
