import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TareasModule } from './tareas/tareas.module';
import * as dotenv from 'dotenv';
dotenv.config()
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TareasModule
    ,MongooseModule.forRoot(process.env.MONGO_URI,{
      dbName:'taller',
      connectionName:'taller'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
