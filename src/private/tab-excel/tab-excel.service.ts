import { Injectable } from '@nestjs/common';
import { CreateTabExcelDto } from './dto/create-tab-excel.dto';

@Injectable()
export class TabExcelService {
  create(createTabExcelDto: CreateTabExcelDto) {
    return 'This action adds a new tabExcel';
  }

 
}
