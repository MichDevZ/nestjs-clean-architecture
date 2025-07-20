import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/domain/entitites/user.entity";

export class UserResponseDto {
  @ApiProperty({ example: 'abc123' })
  id: string;
  @ApiProperty({ example: 'Michael' })
  username: string;
  @ApiProperty({ example: 'michael@gmail.com' })
  email: string;

  constructor(id: string, username: string, email: string) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  static fromDomain(user: User): UserResponseDto {
    return new UserResponseDto(user.id, user.username, user.email);
  }
}

export class BadRequestErrorDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: ['username must be a string', 'email must be valid'] })
  message: string[]; 
}


export class ConflictErrorDto {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: 'Conflict' })
  error: string;

  @ApiProperty({ example: 'The email is already in use' })
  message: string;
}
