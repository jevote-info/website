import { PrismaClient } from '@prisma/client';
import { createSurveyCategory } from '../src/factories/createSurveyCategory';
const prisma = new PrismaClient();

async function main() {
  // await prisma.politicianScore.deleteMany();
  // await prisma.choice.deleteMany();
  // await prisma.question.deleteMany();
  // await prisma.category.deleteMany();

  const survey = [
    createSurveyCategory({ slug: 'theFirstCategory', order: 1 }),
    createSurveyCategory({ slug: 'theSecondCategory', order: 2 }),
    createSurveyCategory({ slug: 'theThirdCategory', order: 3 }),
    createSurveyCategory({ slug: 'theFourthCategory', order: 4 }),
  ];

  const categories = await Promise.all(
    survey.map(({ questions, ...category }) => {
      return prisma.category.upsert({
        include: { questions: true },
        where: { slug: category.slug },
        update: {},
        create: {
          ...category,
          questions: {
            createMany: {
              data: questions.map(({ choices, categoryId, ...question }) => question),
            },
          },
        },
      });
    }),
  );

  await Promise.all(
    survey.flatMap(category =>
      category.questions.flatMap(question =>
        question.choices.flatMap(({ politicianScores, ...choice }) =>
          prisma.choice.upsert({
            where: { id: choice.id },
            update: {},
            create: {
              ...choice,
              politicianScores: {
                createMany: {
                  data: politicianScores.map(({ choiceId, ...politicianScore }) => politicianScore),
                },
              },
            },
          }),
        ),
      ),
    ),
  );

  console.log('=========== DB SEED ===========');
  console.log(categories);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
