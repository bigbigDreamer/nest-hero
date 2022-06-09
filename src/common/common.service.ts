import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class CommonService {
  constructor(
    // 循环依赖，注入服务
    @Inject(forwardRef(() => UserService))
    private commonService: UserService,
  ) {}

  /**
   * @desc 异步的 common 模块 service
   */
  async getCommon() {
    console.log('我是 common service 里的服务');
    return 'Hello Nest Common';
  }
}
