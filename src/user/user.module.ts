import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommonService } from '../common/common.service';
import { CommonModule } from '../common/common.module';

@Module({
  controllers: [UserController],
  imports: [CommonModule],
  providers: [UserService, CommonService],
})
export class UserModule {}
