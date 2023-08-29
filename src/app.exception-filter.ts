import { Request, Response } from "express";
import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from "@nestjs/common";

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (error instanceof HttpException) {
      // Nếu lỗi là một HttpException, trả về mã lỗi và thông báo lỗi
      response.status(error.getStatus()).json({
        statusCode: error.getStatus(),
        message: error.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      // Nếu lỗi không phải là HttpException, trả về lỗi 500 và thông báo lỗi mặc định
      if (error.message) {
        response.status(500).json({
          statusCode: 500,
          message: error.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      } else {
        response.status(500).json({
          statusCode: 500,
          message: "Internal server error",
          timestamp: new Date().toISOString(),
          path: request.url,
        });
      }
    }
  }
}
