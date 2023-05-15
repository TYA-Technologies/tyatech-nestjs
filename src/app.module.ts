import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as moment from "moment/moment";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbConfig } from "./configs/db/db.config";
moment.locale("vi-VN");
import { AuthMiddleware } from "./auth-middleware";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { SystemManagerConstants, SystemManagerModule } from "tyatech-nestjs-system";

@Module({
  imports: [
    SystemManagerModule,
    HttpModule,
    TypeOrmModule.forRoot(DbConfig),
    ScheduleModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: SystemManagerConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
