import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as moment from "moment/moment";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbConfig } from "./configs/db/db.config";
moment.locale("vi-VN");
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import {
  SystemManagerConstants,
  SystemManagerModule,
  AuthMiddleware,
} from "tyatech-nestjs-system";

@Module({
  imports: [
    SystemManagerModule.register({
      secret: "",
      lang: "VI",
      mailer: {
        transport: {
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "",
            pass: "",
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
      },
    }),
    HttpModule,
    TypeOrmModule.forRoot(DbConfig),
    ScheduleModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: SystemManagerConstants.secret,
      signOptions: { expiresIn: "7d" },
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
