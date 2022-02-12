import { PrismaClient } from '@prisma/client';
import { createPolitician } from '../src/factories/createPoliticians';
import { createSurveyCategory } from '../src/factories/createSurveyCategory';
const prisma = new PrismaClient();

async function main() {
  await prisma.politicianScore.deleteMany();
  await prisma.choice.deleteMany();
  await prisma.question.deleteMany();
  await prisma.category.deleteMany();
  await prisma.politician.deleteMany();

  const survey = [
    createSurveyCategory({
      title: 'Société',
      slug: 'societe',
      image: 'society',
      order: 1,
      published: true,
    }),
    createSurveyCategory({
      title: 'Fiscalité',
      slug: 'fiscalite',
      image: 'taxation',
      order: 2,
      published: true,
    }),
    createSurveyCategory({
      title: 'Politique économique & sociale',
      slug: 'economie',
      image: 'economy',
      order: 3,
      published: true,
      questions: [
        {
          title: 'Mondialisation',
          description: "Concernant la mondialisation de l'économie :",
          order: 1,
          published: true,
          choices: [
            {
              text: "La France doit poursuivre l'intégration européenne en inistant sur une Europe sociale, et ne pas signer de nouveaux accourds de libre-échange (TAFTA, CETA, etc.)",
              politicianScores: [],
              order: 1,
            },
            {
              text: 'La France doit sortir des traités économiques européens et internationaux pour pouvoir remettre en place des barrières dounaières.',
              politicianScores: [],
              order: 2,
            },
            {
              text: "La France doit continuer à défendre l'intégration européenne et à signer des accords de libre-échange internationaux.",
              politicianScores: [],
              order: 3,
            },
          ],
        },
        {
          title: 'Revenu universel',
          description: "Etes-vous favorable à la création d'un revenu universel ?",
          order: 2,
          published: true,
          choices: [
            {
              text: 'Oui',
              politicianScores: [],
              order: 1,
            },
            {
              text: 'Non',
              politicianScores: [],
              order: 2,
            },
          ],
        },
        {
          title: 'Aides sociales',
          description: "Concernant les aides sociales de l'Etat, selon vous :",
          order: 3,
          published: true,
          choices: [],
        },
      ],
    }),
    createSurveyCategory({
      title: 'Politique environnementale',
      slug: 'environnement',
      image: 'ecology',
      order: 4,
      published: true,
    }),
    createSurveyCategory({
      title: 'Affaires étrangères',
      slug: 'etranger',
      image: 'foreign-affairs',
      order: 5,
      published: true,
    }),
    createSurveyCategory({
      title: 'Défense',
      slug: 'defense',
      image: 'defense',
      order: 6,
      published: true,
    }),
    createSurveyCategory({
      title: 'Education nationale',
      slug: 'education',
      image: 'education',
      order: 7,
      published: true,
    }),
    createSurveyCategory({
      title: 'Santé',
      slug: 'sante',
      image: 'health',
      order: 8,
      published: true,
    }),
    createSurveyCategory({
      title: 'Culture',
      slug: 'culture',
      image: 'culture',
      order: 9,
      published: true,
    }),
  ];

  const politicians = [
    createPolitician(),
    createPolitician(),
    createPolitician(),
    createPolitician(),
  ];

  for (const politician of politicians) {
    await prisma.politician.create({ data: { ...politician } });
  }

  for (const { questions, ...category } of survey) {
    await prisma.category.upsert({
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

    for (const question of questions) {
      for (const { politicianScores, ...choice } of question.choices) {
        await prisma.choice.upsert({
          where: { id: choice.id },
          update: {},
          create: {
            ...choice,
            politicianScores: {
              createMany: {
                data: politicianScores.map(({ choiceId, ...politicianScore }, index) => ({
                  ...politicianScore,
                  politicianId: politicians[index].id,
                })),
              },
            },
          },
        });
      }
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
