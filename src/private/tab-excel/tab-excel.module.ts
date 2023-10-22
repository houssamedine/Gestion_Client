import { Module } from "@nestjs/common";
import { TabExcelService } from "./tab-excel.service";
import { TabExcelController } from "./tab-excel.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TabExcel } from "./entities/tab-excel.entity";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forFeature([TabExcel]), //Upload File
    // MulterModule.register({
    //   dest: "./uploads",
    // }),
  ],
  controllers: [TabExcelController],
  providers: [TabExcelService],
})
export class TabExcelModule {}
