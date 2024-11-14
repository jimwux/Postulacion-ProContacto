export class CreateUserDto {
    name: string;
    surname: string;
    birthday: string;
    age: number;
    documentType: 'CUIT' | 'DNI';
    documentNumber: number;
  }