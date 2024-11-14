import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],  // Importa el módulo que contiene la lógica del usuario
  controllers: [],
  providers: [],
})
export class AppModule {}