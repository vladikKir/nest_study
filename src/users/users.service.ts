import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      first_name: 'Vladislav',
      last_name: 'Kiriliuk',
      age: 24,
    },
  ];
  create(createUserDto: any) {
    this.users = [...this.users, createUserDto];
    return createUserDto;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((value: User) => value.id === id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: User;
    const updatedUsers = this.users.map((value: User) => {
      if (value.id === id) {
        const updatedValue = { ...value, ...updateUserDto };
        user = updatedValue;
        return updatedValue;
      }
      return value;
    });

    this.users = updatedUsers;
    return user;
  }

  remove(id: number) {
    const filteredUsers = this.users.filter((user: User) => user.id !== id);

    this.users = filteredUsers;
    return this.users;
  }
}
