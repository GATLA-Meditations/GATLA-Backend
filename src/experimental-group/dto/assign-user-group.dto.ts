import { IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignUserToGroupDto {
  @ApiProperty({
    description: 'ID del grupo experimental',
    example: 'clh123456789',
  })
  @IsString()
  groupId: string;

  @ApiProperty({
    description: 'ID del usuario',
    example: 'clh987654321',
  })
  @IsString()
  userId: string;
}

export class BulkAssignUsersDto {
  @ApiProperty({
    description: 'ID del grupo experimental',
    example: 'clh123456789',
  })
  @IsString()
  groupId: string;

  @ApiProperty({
    description: 'Array de IDs de usuarios',
    example: ['clh987654321', 'clh987654322'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  userIds: string[];
}

export class RemoveUserFromGroupDto {
  @ApiProperty({
    description: 'ID del usuario',
    example: 'clh987654321',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Razón de la remoción (opcional)',
    example: 'Usuario abandonó el estudio',
    required: false,
  })
  @IsOptional()
  @IsString()
  reason?: string;
}
