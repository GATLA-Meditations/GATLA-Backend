import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ExperimentalGroup, User } from '@prisma/client';
import { CreateExperimentalGroupDto, UpdateExperimentalGroupDto } from './dto/create-experimental-group.dto';

@Injectable()
export class ExperimentalGroupRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateExperimentalGroupDto): Promise<ExperimentalGroup> {
    return this.prisma.experimentalGroup.create({
      data,
    });
  }

  async findAll(): Promise<ExperimentalGroup[]> {
    return this.prisma.experimentalGroup.findMany({
      include: {
        users: {
          select: {
            id: true,
            patient_code: true,
            programStartDate: true,
            isInvalidated: true,
            invalidationReason: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<ExperimentalGroup | null> {
    return this.prisma.experimentalGroup.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            patient_code: true,
            programStartDate: true,
            isInvalidated: true,
            invalidationReason: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateExperimentalGroupDto): Promise<ExperimentalGroup> {
    return this.prisma.experimentalGroup.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.experimentalGroup.delete({
      where: { id },
    });
  }

  async assignUserToGroup(userId: string, groupId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        experimentalGroupId: groupId,
      },
    });
  }

  async removeUserFromGroup(userId: string, reason?: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        experimentalGroupId: null,
        invalidationReason: reason,
      },
    });
  }

  async bulkAssignUsers(userIds: string[], groupId: string): Promise<void> {
    await this.prisma.user.updateMany({
      where: {
        id: {
          in: userIds,
        },
      },
      data: {
        experimentalGroupId: groupId,
      },
    });
  }

  async getUsersInGroup(groupId: string): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        experimentalGroupId: groupId,
      },
      include: {
        questionnaireSubmissions: {
          include: {
            questionnaire: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async invalidateUser(userId: string, reason: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        isInvalidated: true,
        invalidationReason: reason,
      },
    });
  }

  async startUserProgram(userId: string): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        programStartDate: new Date(),
      },
    });
  }

  async getUsersWithPendingQuestionnaires(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        experimentalGroupId: {
          not: null,
        },
        programStartDate: {
          not: null,
        },
        isInvalidated: false,
      },
      include: {
        experimentalGroup: true,
        questionnaireSubmissions: {
          include: {
            questionnaire: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async getUsersByGroup(): Promise<{ [groupId: string]: User[] }> {
    const groups = await this.prisma.experimentalGroup.findMany({
      include: {
        users: {
          include: {
            questionnaireSubmissions: {
              include: {
                questionnaire: true,
              },
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });

    const result: { [groupId: string]: User[] } = {};
    groups.forEach((group) => {
      result[group.id] = group.users;
    });

    return result;
  }

  async getActiveGroups(): Promise<ExperimentalGroup[]> {
    return this.prisma.experimentalGroup.findMany({
      where: {
        isActive: true,
      },
      include: {
        users: true,
      },
    });
  }
}
