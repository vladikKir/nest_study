import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAll(): string {
    return 'Here all users';
  }
  getOne(id): string {
    return `There is a user #${id}`;
  }
}
