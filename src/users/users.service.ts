import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Skill } from './entities/skills.entity/skills.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async create(createUserDto: any) {
    const skills = await Promise.all(
      createUserDto.skills.map((skill) => this.preloadSkillByName(skill)),
    );
    const user = this.userRepository.create({ ...createUserDto, skills });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['skills'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['skills'],
    });
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const skills =
      updateUserDto.skills &&
      (await Promise.all(
        updateUserDto.skills.map((skill) => this.preloadSkillByName(skill)),
      ));

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
      skills,
    });

    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
      return;
    }

    return this.userRepository.save(user);
  }

  remove(id: number) {
    this.userRepository.delete(id);
  }

  private async preloadSkillByName(name: string): Promise<Skill> {
    const existingSkill = await this.skillRepository.findOne({
      where: { name },
    });

    if (existingSkill) {
      return existingSkill;
    }

    return this.skillRepository.create({ name });
  }
}
