import { Controller, Post,  UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { TabExcel } from './entities/tab-excel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import { TabExcelRepository } from './repository/tab_excel.repository';

@Controller('tab-excel')
export class TabExcelController {
  
    constructor(
      @InjectRepository(TabExcel)
      private readonly repositoryExcel: TabExcelRepository,
    ) {}
  
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadExcelFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      const workbook = XLSX.read(file.buffer);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
      for (const row of data as any[][]) {
        const [nom, prenom, age, salaire,last_Month] = row;
  
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() + 1);
  
        const excelData = this.repositoryExcel.create({
          nom,
          prenom,
          age,
          salaire,
          last_Month:lastMonth
        });
        await this.repositoryExcel.save(excelData);
      }
    }

 
}
