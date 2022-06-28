import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { TableService } from './table.service';
import {
  CreateTableDto,
  GetTableDto,
  DeleteTableDto,
  UpdateTableDto,
} from './dto';
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
  async addTable(@Body(new ValidationPipe()) createTableDto: CreateTableDto) {
    const table = await this.tableService.createTable(createTableDto);

    if (!table) {
      throw new HttpException(
        { message: '创建失败', statusCode: '500', data: null },
        500,
      );
    }

    return { data: null, message: '创建成功' };
  }

  @Put('table')
  @ApiResponse({ status: 200 })
  async putTable(@Body(new ValidationPipe()) updateTableDto: UpdateTableDto) {
    const table = await this.tableService.updateTable(updateTableDto);

    if (!table) {
      throw new HttpException(
        { message: '更新失败', statusCode: '500', data: null },
        500,
      );
    }

    return { data: null, message: '更新成功' };
  }

  @Get('table')
  @ApiResponse({ status: 200 })
  async getTable(@Query() getTableDto: GetTableDto) {
    const table = await this.tableService.getTableList(getTableDto);

    if (!table) {
      throw new HttpException(
        { message: '查询失败', statusCode: '500', data: null },
        500,
      );
    }

    return { data: table, message: null };
  }

  @Delete('table')
  @ApiResponse({ status: 200 })
  async delTable(@Query(new ValidationPipe()) deleteTableDto: DeleteTableDto) {
    const table = await this.tableService.deleteTable(deleteTableDto);

    if (!table) {
      throw new HttpException(
        { message: '删除失败', statusCode: '500', data: null },
        500,
      );
    }

    return { data: null, message: '删除成功' };
  }
}
