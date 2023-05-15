import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as helmet from "helmet";
import { urlencoded, json } from "express";
import { AppModule } from "./app.module";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );
  app.use(json({ limit: "500mb" }));
  app.use(helmet());
  app.use(
    urlencoded({
      limit: "500mb",
      extended: true,
      parameterLimit: 100000,
    })
  );
  app.use(helmet());
  app.engine("ejs", require("ejs").renderFile); // chỉ định engine là EJS\
  app.setViewEngine("ejs"); // sử dụng engine mặc định là EJS
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle("Master")
    .setVersion("1.0")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "token"
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      docExpansion: "none",
      filter: true,
    },
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
