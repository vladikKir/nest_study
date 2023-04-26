import { IsString, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly first_name: string;

  @IsString()
  readonly last_name: string;

  @IsNumber()
  readonly age: number;

  @IsString({ each: true })
  readonly skills: string[];
}
