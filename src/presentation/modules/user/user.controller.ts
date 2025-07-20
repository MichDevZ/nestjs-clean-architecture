import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "src/application/use-cases/create-user.usecase";
import { CreateUserDto } from "./dtos/create-user.dto";
import { BadRequestErrorDto, ConflictErrorDto, UserResponseDto } from "./dtos/user-response.dto";
import { EmailAlreadyInUseError } from "src/application/exceptions/email-already-in-use";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly registerUserUseCase: CreateUserUseCase) {}

  @ApiOperation({ 
    summary: 'Create a new user', 
    description: 'If password is not provided, a secure password will be generated automatically.' 
  })
  @ApiResponse({ status: 201, description: 'User created successfully.', type: UserResponseDto})
  @ApiResponse({ status: 400, description: 'Invalid input.', type: BadRequestErrorDto  })
  @ApiResponse({ status: 409 , description: 'Email already in use', type: ConflictErrorDto   })
  @Post()
  async register(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    try {
        const { username, email, password } = dto;
        const user = await this.registerUserUseCase.execute(username, email, password);
        return UserResponseDto.fromDomain(user);
    } catch (error) {
      if (error instanceof EmailAlreadyInUseError) {
        throw new ConflictException(error.message); 
      }
      throw error;
    }
   
  }
}