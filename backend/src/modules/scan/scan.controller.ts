import { Body, Controller, Post } from '@nestjs/common';
import { ScanService } from './scan.service';

@Controller('scan')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Post()
  scanUrl(@Body() body: { url: string }) {
    return this.scanService.processScan(body.url);
  }
}