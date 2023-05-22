import { Module } from '@nestjs/common';
import { AutoCallHostingController } from './auto-call-hosting.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [AutoCallHostingController]
})
export class AutoCallHostingModule { }
