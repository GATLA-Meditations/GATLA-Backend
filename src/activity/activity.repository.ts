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

  async modifyContent(data: { content?: ContentDto[]; activity?: { id: string; title: string } }) {
    try {
      if (data.content && data.content.length > 0) {
        for (const content of data.content) {
          await this.prisma.content.update({
            where: {
              id: content.id,
            },
            data: {
              content: content.content,
              type: content.type,
            },
          });
        }
      }
      if (data.activity) {
        await this.prisma.activity.update({
          where: {
            id: data.activity.id,
          },
          data: {
            name: data.activity.title,
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
}
