import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { QuestionsDto } from './dto/questions.dto';
import { AnswersDto } from './dto/answers.dto';

@Injectable()
export class ModuleQuestionRepository {
  constructor(private prism: PrismaService) {}

  // Fetches the questions related to the active module
  async getQuestions(userId: string) {
    const today = new Date();
    const currentModule = await this.prism.userModule.findMany({
      where: {
        AND: {
          userId: userId,
          startDate: {
            lte: today,
          },
          endDate: {
            gte: today,
          },
        },
      },
      include: {
        module: {
          include: {
            moduleQuestions: {
              include: {
                questionModule: {
                  include: {
                    userSubmisions: true, // Assuming this is renamed properly
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!currentModule || currentModule.length === 0) {
      return new BadRequestException('User does not have a module');
    }

    // Check if today is the last day of the current module
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
          qualitativeQuestion.questionModule.userSubmisions.every((submission) => submission.userId !== userId),
        ),
      )
    ) {
      return currentModule.flatMap((module) => {
        return module.module.moduleQuestions.map((moduleQuestion) => {
          const question = moduleQuestion.questionModule;
          return new QuestionsDto(question.id, question.question, question.type, question.metadata);
        });
      });
    }
    return currentModule.flatMap((module) => {
      return module.module.moduleQuestions.map((moduleQuestion) => {
        const question = moduleQuestion.questionModule;
        return new QuestionsDto(question.id, question.question, question.type, question.metadata);
      });
    });
    // todo: un-mock once it works
    // return new BadRequestException('User does not need to get questions');
  }

  // Submitting an answer to a specific question
  async submitAnswer(userId: string, questionId: string, questionAnswer: string) {
    const existingAnswer = await this.prism.questionModuleUser.findFirst({
      where: {
        userId: userId,
        moduleQuestionId: questionId,
      },
    });

    if (existingAnswer) {
      return new BadRequestException('User already submitted an answer for this question');
    } else {
      return this.prism.questionModuleUser.create({
        data: {
          userId: userId,
          answer: questionAnswer,
          moduleQuestionId: questionId,
        },
      });
    }
  }

  // Check if it's the right time to answer questions
  async isTimeForQuestions(userId: string) {
    const today = new Date();
    const currentModule = await this.prism.userModule.findMany({
      where: {
        AND: {
          userId: userId,
          startDate: {
            lte: today,
          },
          endDate: {
            gte: today,
          },
        },
      },
      include: {
        module: {
          include: {
            moduleQuestions: {
              include: {
                questionModule: {
                  include: {
                    userSubmisions: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!currentModule || currentModule.length === 0) {
      return new BadRequestException('User does not have a module');
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
          qualitativeQuestion.questionModule.userSubmisions.every((submission) => submission.userId !== userId),
        ),
      )
    );
  }

  // Bulk submit multiple answers for a module
  async submitAnswers(userId: string, answers: AnswersDto[]) {
    const data = answers.map((answer) => ({
      userId: userId,
      moduleQuestionId: answer.id,
      answer: answer.answer ? answer.answer : '',
    }));

    return this.prism.questionModuleUser.createMany({
      data,
      skipDuplicates: true,
    });
  }
}
