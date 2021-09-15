import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
//prueba
async function bootstrap() {

 
      // nest update -f -t latest
      // npm uninstall -g @nestjs/cli
      // npm install -g @nestjs/cli
      // npm i --save @nestjs/config
    
      //npm i --save @nestjs/config
      //npm install --save @nestjs/mongoose mongoose

      //npm install --save @nestjs/passport passport passport-local
      //npm install --save-dev @types/passport-local

      // vercel https://github.com/fyupanquia/shop-api
      const app = await NestFactory.create(AppModule);
      const configService = app.get(ConfigService);
      
      const config = new DocumentBuilder()
        .setTitle('LDS BACK')
        .setDescription('Services - Back LDS Barrio Alta Tensión')
        .setVersion('1.0')
        .addTag('LDS BAT')
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);
      await app.listen(3000);
      //await app.listen(configService.get<number>('port'), configService.get<string>('host'));
    
}
bootstrap();
