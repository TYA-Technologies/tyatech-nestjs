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
import { AutoCallHostingModule } from "./auto-call-hosting/auto-call-hosting.module";
import { AuthMiddleware } from "./auth-middleware";
import { JwtModule } from "@nestjs/jwt";
import { SystemManagerConstants, SystemManagerModule } from "tyatech-nestjs-system";

@Module({
  imports: [
    SystemManagerModule,
    AutoCallHostingModule,
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
    }),
    TypeOrmModule.forRoot(DbConfig),
    ScheduleModule.forRoot(),    
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
