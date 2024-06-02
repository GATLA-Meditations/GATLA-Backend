import { HttpException, Injectable } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { ActivityDto } from './dto/activity.dto';
import { ContentDto } from './dto/content.dto';

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
}
