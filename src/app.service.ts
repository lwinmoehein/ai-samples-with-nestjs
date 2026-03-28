import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): any {
    return {
      message: 'api is working fine',
    };
  }
}
