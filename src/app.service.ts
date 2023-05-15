import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {} {
    return "<h1>TYA TECH - Web API</h1>";
  }
}
