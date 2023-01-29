import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), UserModule, TodoModule]
})
export class AppModule {}
