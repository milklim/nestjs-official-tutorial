import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const reqStart = Date.now();
    console.time('Req-resp time');
    console.log('Hi from middleware');

    res.on('finish', () => console.timeEnd('Req-resp time'));
    next();
  }
}
