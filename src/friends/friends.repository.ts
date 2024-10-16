import { PrismaService } from 'src/prisma.service';

export default class FriendsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async addFriend(userId: string, friendId: string) {
    this.prismaService.user.update({
      where: { id: userId },
      data: {
        friendsId: {
          push: friendId,
        },
      },
    });
    return this.prismaService.user.update({
      where: { id: friendId },
      data: {
        friendsId: {
          push: userId,
        },
      },
    });
  }

  async getFriends(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    return user.friendsId;
  }

  async deleteFriend(userId: string, friendId: string) {
    this.prismaService.user.update({
      where: { id: userId },
      data: {
        friendsId: {
          set: (
            await this.prismaService.user.findUnique({
              where: { id: userId },
            })
          ).friendsId.filter((actual) => friendId !== actual),
        },
      },
    });
    this.prismaService.user.update({
      where: { id: friendId },
      data: {
        friendsId: {
          set: (
            await this.prismaService.user.findUnique({
              where: { id: friendId },
            })
          ).friendsId.filter((actual) => userId !== actual),
        },
      },
    });
  }
}
