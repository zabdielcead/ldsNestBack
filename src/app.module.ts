import { Module, Get } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './environment/configuration';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load:[configuration]
    }),
    //MongooseModule.forRoot('mongodb+srv://user_node_cafe:zabdiel1@mycluster.iafyy.mongodb.net/lds'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
       uri: configService.get<string>('urlmongo'),
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
      }),
      inject: [ConfigService],
     }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
