import { EntityRepository, Repository } from "typeorm";
import { TabExcel } from './../entities/tab-excel.entity';

@EntityRepository(TabExcel)
export class TabExcelRepository extends Repository<TabExcel> {}