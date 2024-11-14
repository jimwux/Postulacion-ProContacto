import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.validarYProcesarUsuario(createUserDto);
      return { message: 'Usuario procesado exitosamente', data: result };
    } catch (error) {
      return { message: error.message };
    }
  }
}