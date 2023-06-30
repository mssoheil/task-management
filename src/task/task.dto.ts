import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskRequestDto {
  @ApiProperty({
    required: true,
    type: String,
    nullable: false,
    description: 'task title',
    example: 'my task',
  })
  title: string;

  @ApiProperty({
    required: true,
    type: String,
    nullable: false,
    description: 'task description',
    example: 'my description',
  })
  description: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    nullable: false,
    description: 'task done status',
    example: false,
  })
  isDone: boolean;
}
