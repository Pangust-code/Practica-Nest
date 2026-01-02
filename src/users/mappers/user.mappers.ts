import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static toEntity(id: number, dto: CreateUserDto): UserEntity {
    const user = new UserEntity();
    user.id = id;
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password;
    return user;
  }

  static toResponseDto(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
