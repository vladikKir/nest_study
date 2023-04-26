import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JoinTable } from 'typeorm';
import { Skill } from './skills.entity/skills.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  age: number;

  @JoinTable()
  @ManyToMany((type) => Skill, (skill) => skill.users, { cascade: true })
  skills: Skill[];
}
