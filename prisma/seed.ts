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
      title: "Fonctionnement de l'Etat & institutions",
      slug: 'institutions',
      image: 'institutions',
      order: 3,
      published: true,
    }),
    createSurveyCategory({
      title: 'Politique Économique & Sociale, immigration',
      slug: 'economie',
      image: 'economy',
      order: 4,
      published: true,
    }),
    createSurveyCategory({
      title: 'Politique environnementale',
      slug: 'environnement',
      image: 'ecology',
      order: 5,
      published: true,
    }),
    createSurveyCategory({
      title: 'Affaires étrangères & Défense',
      slug: 'etranger',
      image: 'foreign-affairs',
      order: 6,
      published: true,
    }),
    createSurveyCategory({
      title: 'Justice',
      slug: 'justice',
      image: 'justice',
      order: 7,
      published: true,
    }),
    createSurveyCategory({
      title: 'Energie',
      slug: 'energie',
      image: 'energy',
      order: 8,
      published: true,
    }),
    createSurveyCategory({
      title: 'Santé',
      slug: 'sante',
      image: 'health',
      order: 9,
      published: true,
    }),
  ];

  const politicians = [
    createPolitician({
      name: 'Jean-Luc Mélenchon',
      slug: 'jean-luc-melenchon',
      programUrl: 'https://melenchon2022.fr/programme/',
      pictureUrl: '/candidates/jean-luc-melenchon.png',
      politicalParty: 'La France Insoumise',
      description:
        "Jean-Luc Mélenchon est le candidat de la France Insoumise et du mouvement L'union Populaire.",
    }),
    createPolitician({
      name: 'Yannick Jadot',
      slug: 'yannick-jadot',
      programUrl: 'https://www.jadot2022.fr/programme',
      pictureUrl: '/candidates/yannick-jadot.png',
      politicalParty: 'Europe Écologie Les Verts',
      description:
        "Yannick Jadot est le candidat d'Europe Écologie Les Verts. Il a remporté la primaire écologiste en Septembre 2021.",
    }),
    createPolitician({
      name: 'Valérie Pécresse',
      slug: 'valerie-pecresse',
      programUrl: 'https://valeriepecresse.fr/projets/',
      pictureUrl: '/candidates/valerie-pecresse.png',
      politicalParty: 'Les Républicains',
      description:
        'Valérie Pécresse est la candidate des Républicains. Elle a remporté la primaire des Républicains en Décembre 2021.',
    }),
    createPolitician({
      name: 'Emmanuel Macron',
      slug: 'emmanuel-macron',
      programUrl: 'https://avecvous.fr',
      pictureUrl: '/candidates/emmanuel-macron.png',
      politicalParty: 'La République En Marche !',
      description:
        "Emmanuel Macron est le candidat de La République En Marche !. Il est l'actuel Président de la République.",
    }),
    createPolitician({
      name: 'Anne Hidalgo',
      slug: 'anne-hidalgo',
      programUrl: 'https://www.2022avechidalgo.fr/notre_programme',
      pictureUrl: '/candidates/anne-hidalgo.png',
      politicalParty: 'Parti Socialiste',
      description:
        'Anne Hidalgo est la candidate du Parti Socialiste. Elle a été désignée candidate par les militants du Parti Socialiste.',
    }),
    createPolitician({
      name: 'Marine Le Pen',
      slug: 'marine-le-pen',
      programUrl: 'https://mlafrance.fr/programme',
      pictureUrl: '/candidates/marine-le-pen.png',
      politicalParty: 'Rassemblement National',
      description: 'Marine Le Pen est la candidate du Rassemblement National.',
    }),
    createPolitician({
      name: 'Eric Zemmour',
      slug: 'eric-zemmour',
      programUrl: 'https://programme.zemmour2022.fr',
      pictureUrl: '/candidates/eric-zemmour.png',
      politicalParty: 'Reconquête !',
      description: 'Eric Zemmour est le candidat du mouvement Reconquête !.',
    }),
    createPolitician({
      name: 'Fabien Roussel',
      slug: 'fabien-roussel',
      programUrl: 'https://www.fabienroussel2022.fr/le_programme',
      pictureUrl: '/candidates/fabien-roussel.png',
      politicalParty: 'Parti Communiste Français',
      description: 'Fabien Roussel est le candidat du Parti Communiste Français.',
    }),
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
