import { Module } from '@nestjs/common';
import { APP_FILTER, BaseExceptionFilter  } from '@nestjs/core';

import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },

  ]
})
export class AppModule {}
