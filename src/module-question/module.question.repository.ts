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
    const currentModule = await this.prism.userModule.findFirst({
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
      orderBy: {
        startDate: 'asc',
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

    if (!currentModule) {
      return new BadRequestException('User does not have a module');
    }

    // Check if today is the last day of the current module
    const isLastDay =
      currentModule.endDate.getFullYear() === today.getFullYear() &&
      currentModule.endDate.getMonth() === today.getMonth() &&
      currentModule.endDate.getDate() === today.getDate();

    if (
      isLastDay &&
      currentModule.module.moduleQuestions.some((qualitativeQuestion) =>
        qualitativeQuestion.questionModule.userSubmisions.every((submission) => submission.userId !== userId),
      )
    ) {
      return currentModule.module.moduleQuestions.map((moduleQuestion) => {
        const question = moduleQuestion.questionModule;
        return new QuestionsDto(question.id, question.question, question.type, question.metadata);
      });
    }
    return currentModule.module.moduleQuestions.map((moduleQuestion) => {
      const question = moduleQuestion.questionModule;
      return new QuestionsDto(question.id, question.question, question.type, question.metadata);
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
    const currentModule = await this.prism.userModule.findFirst({
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
      orderBy: {
        startDate: 'asc',
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

    if (!currentModule) {
      return new BadRequestException('User does not have a module');
    }

    console.log(currentModule.id, 'currentModule');
    console.log(currentModule.endDate, 'endDate');
    console.log(today, 'today');
    const isLastDay =
      currentModule.endDate.getFullYear() === today.getFullYear() &&
      currentModule.endDate.getMonth() === today.getMonth() &&
      currentModule.endDate.getDate() === today.getDate();
    console.log(isLastDay, 'isLastDay');

    const moduleQuestions = await this.prism.questionModuleModule.findMany({
      where: {
        moduleId: currentModule.moduleId,
      },
      include: {
        questionModule: {
          include: {
            userSubmisions: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });
    const hasAnswered = moduleQuestions.every((moduleQuestion) => {
      const question = moduleQuestion.questionModule;
      return question.userSubmisions.length > 0;
    });

    console.log(hasAnswered, 'hasAnswered');
    return isLastDay && !hasAnswered;
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
