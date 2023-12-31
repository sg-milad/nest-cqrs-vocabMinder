import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth';
import { CommonModule } from './common';
import { ConfigModule, ConfigService } from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { CqrsModule } from '@nestjs/cqrs';
import { WordModule } from './modules/word/word.module';
import { WordsBoxModule } from './modules/wordsBox/wordsBox.module';
import { BoxModule } from './modules/box/box.module';
import { ThrottlerGuard, ThrottlerModule, } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import { Redis } from 'ioredis';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    AuthModule,
    CommonModule,
    CqrsModule,
    WordModule,
    WordsBoxModule,
    BoxModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule,],
      inject: [ConfigService],
      useFactory: (config: ConfigService,) => ({
        throttlers: [
          {
            limit: Number(config.get('THROTTLE_LIMIT')),
            ttl: Number(config.get('THROTTLE_TTL')),
          },
        ],
        storage: new ThrottlerStorageRedisService(new Redis({
          host: config.get('REDIS_HOST'),
          port: Number(config.get('REDIS_PORT')),
        })),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }],
})
export class AppModule { }
