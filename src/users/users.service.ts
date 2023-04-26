import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: any) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
      return;
    }

    Object.keys(updateUserDto).forEach(
      (key) => (user[key] = updateUserDto[key]),
    );

    return this.userRepository.save(user);
  }

  remove(id: number) {
    this.userRepository.delete(id);
  }
}
