import { Module } from '@nestjs/common';
import { APP_FILTER, BaseExceptionFilter } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import configuration from './config';

@Module({
  imports: [
    UserModule,
    CommonModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  exports: [CommonModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
    {
      provide: 'ANY_VALUE',
      useValue: 'Hello World',
    },
    {
      provide: 'TEST_ANY_VALUE',
      useFactory: (anyValue: string) => {
        console.log(anyValue);
      },
      inject: [{ token: 'ANY_VALUE', optional: true }],
    },
  ],
})
export class AppModule {}
