import {Controller, Get, HttpException, Query, HttpStatus} from '@nestjs/common';
import {
    ApiQuery, ApiTags
} from '@nestjs/swagger';
import { HelloDto } from './dto/hello.dto';
import {Cat} from "./entities/hello.entity";

@ApiTags('user')
@Controller('user')
export class UserController {

    @Get('hello')
    @ApiQuery({ type: Cat })
    getHelloWorld(@Query() query: HelloDto) {
        console.log(query, "query params", query.name);
        return "Hello Nest";
    }

    @Get('exp')
    getException() {
        throw new HttpException("No Auth", HttpStatus.FORBIDDEN)
    }
}
