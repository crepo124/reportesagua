import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<User> {
    const exists = await this.usersRepository.findByEmail(dto.email);
    if (exists) {
      throw new ConflictException('El email ya esta registrado');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.usersRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      isNotificationEnabled: dto.isNotificationEnabled ?? false,
    });
  }

  async validateCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
  }
}