import { ApiProperty } from '@nestjs/swagger';

export class ExperimentalGroupDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  durationWeeks: number;

  @ApiProperty({ type: [Number] })
  questionnaireWeeks: number[];

  @ApiProperty({ type: [Number] })
  meditationWeeks: number[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  userCount?: number;
}

export class UserParticipationStatusDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  patientCode: string;

  @ApiProperty()
  programStartDate?: Date;

  @ApiProperty()
  currentWeek?: number;

  @ApiProperty()
  isInvalidated: boolean;

  @ApiProperty()
  invalidationReason?: string;

  @ApiProperty()
  completedQuestionnaires: number;

  @ApiProperty()
  totalRequiredQuestionnaires: number;

  @ApiProperty()
  isCompliant: boolean;

  @ApiProperty()
  nextQuestionnaireWeek?: number;

  @ApiProperty()
  hasMeditationThisWeek: boolean;
}

export class GroupParticipationSummaryDto {
  @ApiProperty()
  group: ExperimentalGroupDto;

  @ApiProperty({ type: [UserParticipationStatusDto] })
  participants: UserParticipationStatusDto[];

  @ApiProperty()
  totalParticipants: number;

  @ApiProperty()
  activeParticipants: number;

  @ApiProperty()
  invalidatedParticipants: number;

  @ApiProperty()
  compliantParticipants: number;
}
