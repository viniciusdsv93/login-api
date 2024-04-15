import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './Dto/createUser.dto';
import { v4 as uuid } from 'uuid';
import { hash, compare } from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './Dto/loginUserDto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(createUserDto: CreateUserDto) {
    const { name, email, password, passwordConfirmation } = createUserDto;

    const emailAlreadyInUse = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (emailAlreadyInUse) {
      throw new BadRequestException('Email já em uso');
    }

    if (password !== passwordConfirmation) {
      throw new BadRequestException('Confirmação de senha inválida');
    }
    const Id = uuid();
    const passwordHash = await hash(password, 12);
    const newUser = {
      Id,
      name,
      email,
      passwordHash,
    };
    return await this.prisma.user.create({
      data: newUser,
      select: {
        Id: true,
      },
    });
  }

  async signin(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user) {
      throw new BadRequestException('Credenciais inválidas');
    }

    const { Id, email, passwordHash } = user;

    const validPassword = await compare(loginUserDto.password, passwordHash);

    if (!validPassword) {
      throw new BadRequestException('Credenciais inválidas');
    }

    const token = sign({ Id, email }, 'a');

    return {
      access_token: token,
    };
  }
}
