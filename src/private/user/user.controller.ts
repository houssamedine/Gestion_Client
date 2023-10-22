import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const isAdmin = true; // Set this to true for admin users
    return this.userService.create(createUserDto, isAdmin);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
