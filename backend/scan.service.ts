import { Injectable } from '@nestjs/common';

@Injectable()
export class ScanService {
  processScan(url: string) {
    return {
      status: 'ok',
      url: url,
    };
  }
}