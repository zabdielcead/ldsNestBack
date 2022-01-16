import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
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
      const app: NestExpressApplication = await NestFactory.create(AppModule);
      const configService = app.get(ConfigService);
      
      const config = new DocumentBuilder()
        .setTitle('LDS BACK')
        .setDescription('Services - Back LDS Barrio Alta Tensión')
        .setVersion('1.0')
        .addTag('LDS BAT')
        .addServer('/')
        .build();
      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('api', app, document);

      
      
      app.useStaticAssets(join(__dirname, '..', 'filesswagger'),{
        prefix:'/api/'
      })


      const options = {
        'origin': [
          'http://localhost:4200',
          'http://localhost:5030',
          'http://localhost',
          '*',
        ],
        'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        'preflightContinue': false,
        'optionsSuccessStatus': 204,
        'credentials':true,
        'allowedHeaders': 'Content-Type, Accept, authlds',
        
    }
    //app.use(cors(options))
    app.enableCors(options)
      
      await app.listen(3000);
      //await app.listen(configService.get<number>('port'), configService.get<string>('host'));
    
}
bootstrap();
