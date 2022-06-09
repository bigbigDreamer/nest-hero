import {
  Controller,
  Get,
  HttpException,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { HelloDto } from './dto/hello.dto';
import { Cat } from './entities/hello.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private commonConfig: ConfigService,
  ) {}

  @Get('hello')
  @ApiQuery({ type: Cat })
  getHelloWorld(@Query() query: HelloDto) {
    console.log(query, 'query params', query.name, this.commonConfig);
    return this.userService.getHello();
  }

  @Get('exp')
  getException() {
    throw new HttpException('No Auth', HttpStatus.FORBIDDEN);
  }
}
