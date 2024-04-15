import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginUserDto {
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
}
