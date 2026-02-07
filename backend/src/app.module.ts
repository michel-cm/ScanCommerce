import { Module } from '@nestjs/common';
import { ScanModule } from './modules/scan/scan.module';

@Module({
  imports: [ScanModule],
  controllers: [],
  providers: [],
})
export class AppModule {}