import { Module } from '@nestjs/common';

import * as path from 'path';
import { I18nModule, AcceptLanguageResolver, QueryResolver, HeaderResolver } from 'nestjs-i18n';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './global/global.module';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminModule, AuthadminModule, UserModule, AuthuserModule } from './users/index'

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB), 
    GlobalModule, 

    AdminModule,
    AuthadminModule,
    UserModule,
    AuthuserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  constructor(){
    // console.log(process.env)
  }

}
