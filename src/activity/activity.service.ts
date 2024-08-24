import { HttpException, Injectable } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { ActivityDto } from './dto/activity.dto';
import { ContentDto } from './dto/content.dto';
import { createActivityDto } from './dto/create-activity.dto';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  public async getActivityById(id: string) {
    const activity = await this.activityRepository.getActivityById(id);
    if (!activity) throw new HttpException('Activity not found', 404);
    return new ActivityDto({
      ...activity,
      contents: activity.contents.map((activityContent) => new ContentDto(activityContent.content)),
    });
  }

  async createActivity(data: createActivityDto) {
    const created_content: ContentDto[] = await Promise.all(
      data.contents.map(async (content) => {
        return await this.createContent(content);
      }),
    );
    const created_activity = await this.activityRepository.createActivity(data.name);
    created_content.forEach((element, index) => {
      this.activityRepository.createActivityContent(created_activity.id, element.id, index);
    });
    return new ActivityDto({
      ...created_activity,
      contents: created_content,
    });
  }

  async modifyContent(content: { content?: ContentDto; activity?: { id: string; title: string } }) {
    return this.activityRepository.modifyContent(content);
  }

  async createContent(data: CreateContentDto): Promise<ContentDto> {
    return this.activityRepository.createContent(data);
  }
}
