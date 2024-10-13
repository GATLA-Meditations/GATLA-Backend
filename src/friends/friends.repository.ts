import { PrismaService } from 'src/prisma.service';

export default class FriendsRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
