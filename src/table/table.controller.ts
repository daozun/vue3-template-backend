import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
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

    if (!table) {
      throw new HttpException(
        { message: '创建失败', statusCode: '500', data: null },
        500,
      );
    }

    return { data: null, message: '创建成功' };
  }

  @Get('table')
  @ApiResponse({ status: 200 })
  async getTable(@Query() tableDto: TableDto) {
    const table = await this.tableService.getTableList(tableDto);

    if (!table) {
      throw new HttpException(
        { message: '查询失败', statusCode: '500', data: null },
        500,
      );
    }

    return { data: table, message: null };
  }
}
