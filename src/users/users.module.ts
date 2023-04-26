import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Skill } from './entities/skills.entity/skills.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Skill])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
