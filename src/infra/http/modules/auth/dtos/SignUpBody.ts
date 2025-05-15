import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignUpBody {
  @IsEmail()
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsString({ message: 'E-mail é inválido' })
  email: string;

  @IsString({ message: 'Senha é inválida' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
    },
  )
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsString()
  avatar?: string;
}
