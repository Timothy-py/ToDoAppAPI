import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guard';

@Module({
  imports: [
    AuthModule, 
    PrismaModule, 
    ConfigModule.forRoot({isGlobal: true}), 
    UserModule, 
    TodoModule, 
    CommentModule, 
    TagModule,
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: AtGuard
  }]
})
export class AppModule {}
