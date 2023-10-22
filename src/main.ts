import { SERVER_PORT } from './common/config/constants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  //Global Prefixe
  // app.setGlobalPrefix('api/v0');

  // server port
  const port = +configService.get<number>(SERVER_PORT) || 3000;
  await app.listen(port);
  // console.log(`listening on port ${await app.getUrl()}`)
}
bootstrap();
