import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Nome é obrigatório',
  })
  @IsString({
    message: 'Nome inválido',
  })
  name: string;

  @IsNotEmpty({
    message: 'Email é obrigatório',
  })
  @IsEmail(
    {},
    {
      message: 'Email inválido',
    },
  )
  email: string;

  @IsNotEmpty({
    message: 'Senha é obrigatória',
  })
  @IsString({
    message: 'Senha inválida',
  })
  password: string;

  @IsNotEmpty({
    message: 'Confirmação de senha é obrigatória',
  })
  @IsString({
    message: 'Confirmação de senha inválida',
  })
  passwordConfirmation: string;
}
