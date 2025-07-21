import { IsString, IsInt, IsArray, IsOptional, IsBoolean, Min, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExperimentalGroupDto {
  @ApiProperty({
    description: 'Nombre del grupo experimental',
    example: 'Grupo Control A',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descripción del grupo (opcional)',
    example: 'Grupo de control para el estudio de meditación',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Duración total del programa en semanas',
    example: 16,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  durationWeeks: number;

  @ApiProperty({
    description: 'Semanas en las que se deben enviar cuestionarios',
    example: [1, 8, 16],
    type: [Number],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  questionnaireWeeks: number[];

  @ApiProperty({
    description: 'Semanas en las que deben hacer ejercicios de meditación',
    example: [1, 2, 3, 4, 5, 6, 7, 8],
    type: [Number],
  })
  @IsArray()
  @IsInt({ each: true })
  meditationWeeks: number[];

  @ApiProperty({
    description: 'Si el grupo está activo',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}

export class UpdateExperimentalGroupDto {
  @ApiProperty({
    description: 'Nombre del grupo experimental',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Descripción del grupo',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Duración total del programa en semanas',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  durationWeeks?: number;

  @ApiProperty({
    description: 'Semanas en las que se deben enviar cuestionarios',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  questionnaireWeeks?: number[];

  @ApiProperty({
    description: 'Semanas en las que deben hacer ejercicios de meditación',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  meditationWeeks?: number[];

  @ApiProperty({
    description: 'Si el grupo está activo',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
