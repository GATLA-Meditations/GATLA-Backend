import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { QuestionsDto } from './dto/questions.dto';
import { AnswersDto } from './dto/answers.dto';

@Injectable()
export class ModuleQuestionRepository {
  constructor(private prism: PrismaService) {}

  async getQuestions(userId: string) {
    const today = new Date();
    const currentModule = await this.prism.userModule.findMany({
      where: {
        AND: {
          userId: userId,
          startDate: {
            lte: today, // Ensures that startDate is less than or equal to today's date
          },
          endDate: {
            gte: today, // Ensures that endDate is greater than or equal to today's date
          },
        },
      },
      include: {
        module: {
          include: {
            moduleQuestions: {
              include: {
                userSubmisions: true,
              },
            },
          },
        },
      },
    });

    if (!currentModule || currentModule.length === 0) {
      return new BadRequestException('User does not have module');
    }

    const isLastDay = currentModule.some((module) => {
      const endDate = new Date(module.endDate);
      return (
        endDate.getFullYear() === today.getFullYear() && endDate.getMonth() === today.getMonth() && endDate.getDate() === today.getDate()
      );
    });

    if (
      isLastDay &&
      currentModule.some((module) =>
        module.module.moduleQuestions.some((qualitativeQuestion) =>
          qualitativeQuestion.userSubmisions.every((submission) => submission.userId !== userId),
        ),
      )
    ) {
      return currentModule.flatMap((module) => {
        return module.module.moduleQuestions.map((question) => {
          return new QuestionsDto(question.id, question.question, question.type, question.metadata);
        });
      });
    }
    return new BadRequestException('Not time for qualitative question');
  }

  async submitAnswer(userId: string, questionsId: string, questionAnswer: string) {
    const answer = await this.prism.questionModuleUser.findFirst({
      where: {
        userId: userId,
      },
    });

    if (answer) {
      return new BadRequestException('User already have answer');
    } else {
      return this.prism.questionModuleUser.create({
        data: {
          userId: userId,
          answer: questionAnswer,
          moduleQuestionId: questionsId,
        },
      });
    }
  }

  async isTimeForQuestions(userId: string) {
    const today = new Date();
    const currentModule = await this.prism.userModule.findMany({
      where: {
        AND: {
          userId: userId,
          startDate: {
            lte: today, // Ensures that startDate is less than or equal to today's date
          },
          endDate: {
            gte: today, // Ensures that endDate is greater than or equal to today's date
          },
        },
      },
      include: {
        module: {
          include: {
            moduleQuestions: {
              include: {
                userSubmisions: true,
              },
            },
          },
        },
      },
    });

    if (!currentModule || currentModule.length === 0) {
      return new BadRequestException('User does not have module');
    }

    const isLastDay = currentModule.some((module) => {
      const endDate = new Date(module.endDate);
      return (
        endDate.getFullYear() === today.getFullYear() && endDate.getMonth() === today.getMonth() && endDate.getDate() === today.getDate()
      );
    });

    return (
      isLastDay &&
      currentModule.some((module) =>
        module.module.moduleQuestions.some((qualitativeQuestion) =>
          qualitativeQuestion.userSubmisions.every((submission) => submission.userId !== userId),
        ),
      )
    );
  }

  async submitAnswers(userId: string, answers: AnswersDto[]) {
    const data = answers.map((answer) => ({
      userId,
      moduleQuestionId: answer.id, // access the individual answer's id
      answer: answer.answer, // access the individual answer's response
    }));

    return this.prism.questionModuleUser.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
