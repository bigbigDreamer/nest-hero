import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { UserService } from '../user/user.service';

@Module({
  providers: [CommonService, UserService],
  // exports: [CommonService],
})
export class CommonModule {}
