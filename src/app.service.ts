import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): {} {
    return "<h1>Web API - Technology solution provided by Tya Technologies</h1>";
  }
}
