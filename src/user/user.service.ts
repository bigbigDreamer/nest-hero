import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CommonService } from '../common/common.service';

@Injectable()
export class UserService {
  constructor(
    // 对于循环引用文件需要彼此提供相互的 forwardRef 去指引注入，否则 nest 不会帮我们做实力话
    @Inject(forwardRef(() => CommonService))
    private userService: CommonService,
  ) {}

  getHello() {
    // 调用 services 层的 common 服务
    return this.userService.getCommon();
  }
}
