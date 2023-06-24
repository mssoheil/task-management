import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({
    required: true,
    type: String,
    nullable: false,
    description: 'fullName',
    example: 'myfullName',
  })
  fullName: string;

  @ApiProperty({
    required: true,
    type: String,
    nullable: false,
    description: 'username',
    example: 'myUserName',
  })
  username: string;

  @ApiProperty({
    required: true,
    type: String,
    nullable: false,
    description: 'password',
    example: 'myPassword',
  })
  password: string;

  @ApiProperty({
    required: true,
    type: String,
    nullable: false,
    description: 'email',
    example: 'myEmail',
  })
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    nullable: false,
    description: 'mobileNumber',
    example: 'myMobileNumber',
  })
  mobileNumber: string;
}
