import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { TableService } from './table.service';
import { TableDto } from './dto/index';
import { ResponseInterceptor } from '../interceptor/response.interceptor';
import { ValidationPipe } from '../pipe/validation.pipe';

@ApiBearerAuth()
@ApiTags('table')
@Controller('/dev-api')
@UseInterceptors(ResponseInterceptor)
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('table')
  @ApiResponse({ status: 200 })
  async addTable(@Body(new ValidationPipe()) tableDto: TableDto) {
    const table = await this.tableService.createTable(tableDto);
    console.log(
      '%c [ table ]-20',
      'font-size:13px; background:pink; color:#bf2c9f;',
      table,
    );

    // if (!table) {
    //   throw new HttpException(
    //     { message: '用户名或密码错误', code: '401', data: null },
    //     500,
    //   );
    // }

    // return { data: null, message: '创建成功' };
  }
}
