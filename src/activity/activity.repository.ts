import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { ContentDto } from './dto/content.dto';

@Injectable()
export class ActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getActivityById(id: string) {
    return this.prisma.activity.findUnique({
      where: {
        id,
      },
      include: {
        contents: {
          include: {
            content: true,
          },
        },
      },
    });
  }

  async createActivity(name: string) {
    return this.prisma.activity.create({
      data: {
        name: name,
      },
    });
  }

  async createContent(data: CreateContentDto) {
    return this.prisma.content.create({
      data,
    });
  }

  async createActivityContent(activityId: string, contentId: string, order: number) {
    return this.prisma.activityContent.create({
      data: {
        activityId,
        contentId,
        order,
      },
    });
  }

  async modifyContent(content: ContentDto) {
    return this.prisma.content.update({
      where: {
        id: content.id,
      },
      data: {
        content: content.content,
      },
    });
  }
}
