import { Module } from "@nestjs/common";
import { ProductoModule } from "./producto/product.module";
import { RoleModule } from "./role/role.module";
import { TabExcelModule } from "./tab-excel/tab-excel.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [ProductoModule, RoleModule, UserModule,TabExcelModule ],
})
export class PrivateModule {}
