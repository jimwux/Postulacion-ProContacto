import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  async validarYProcesarUsuario(data: CreateUserDto) {
    // Agregar mayusculas al principio
    data.name = this.capitalizarPrimeraLetra(data.name);
    data.surname = this.capitalizarPrimeraLetra(data.surname);

    // Validar el formato de cumpleaños
    const validBirthday = this.validarCumpleanios(data.birthday);
    if (!validBirthday) {
      throw new Error('Formato de fecha inválido o fecha incorrecta');
    }

    // Validar edad (debe ser un número entero)
    if (!Number.isInteger(data.age)) {
      throw new Error('Edad deberia ser de tipo Integer');
    }

    // Validar documentType (debe ser CUIT o DNI)
    if (!['CUIT', 'DNI'].includes(data.documentType)) {
      throw new Error('Tipo de documento inválido');
    }

    // Hacer la petición
    try {
      const response = await axios.post('https://reclutamiento-dev-procontacto-default-rtdb.firebaseio.com/reclutier.json', data);
      return response.data;
    } catch (error) {
      throw new Error('Error al realizar una solicitud externa');
    }
  }

  //  privado para hacer mayúscula la primera letra
  private capitalizarPrimeraLetra(texto: string): string {
    return texto.replace(/\b\w/g, char => char.toUpperCase());
  }

  // Metodo privado para validar fecha
  private validarCumpleanios(birthday: string): boolean {
    const date = new Date(birthday);
    const fechaActual = new Date();
    const fechaMinima = new Date('1900-01-01');
    
    const esValida  = (
        !isNaN(date.getTime()) &&  // verifica que sean numeros
        date <= fechaActual &&  // verifica si la fecha no es posterior a hoy
        date >= fechaMinima &&  // verifica si la fecha no es anterior a 1900/01/01
        !!birthday.match(/^\d{4}\/\d{2}\/\d{2}$/)); // formato YYYY/MM/DD

    return esValida;
  }
}