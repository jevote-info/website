import { PrismaClient } from '@prisma/client';
import { parseSurvey } from './parseSurvey';
const prisma = new PrismaClient();

async function main() {
  await prisma.categoryScore.deleteMany();
  await prisma.politicianResultScore.deleteMany();
  await prisma.result.deleteMany();
  await prisma.questionAnswer.deleteMany();
  await prisma.politicianScore.deleteMany();
  await prisma.choice.deleteMany();
  await prisma.question.deleteMany();
  await prisma.category.deleteMany();
  await prisma.politician.deleteMany();

  const politicians = {
    JLM: await prisma.politician.create({
      data: {
        name: 'Jean-Luc Mélenchon',
        slug: 'jean-luc-melenchon',
        programUrl: 'https://melenchon2022.fr/programme/',
        pictureUrl: '/candidates/jean-luc-melenchon.png',
        politicalParty: 'La France Insoumise',
        description:
          "Jean-Luc Mélenchon est le candidat de la France Insoumise et du mouvement L'union Populaire.",
        bannerUrl: '',
      },
    }),
    YJ: await prisma.politician.create({
      data: {
        name: 'Yannick Jadot',
        slug: 'yannick-jadot',
        programUrl: 'https://www.jadot2022.fr/programme',
        pictureUrl: '/candidates/yannick-jadot.png',
        politicalParty: 'Europe Écologie Les Verts',
        description:
          "Yannick Jadot est le candidat d'Europe Écologie Les Verts. Il a remporté la primaire écologiste en Septembre 2021.",
        bannerUrl: '',
      },
    }),
    VP: await prisma.politician.create({
      data: {
        name: 'Valérie Pécresse',
        slug: 'valerie-pecresse',
        programUrl: 'https://valeriepecresse.fr/projets/',
        pictureUrl: '/candidates/valerie-pecresse.png',
        politicalParty: 'Les Républicains',
        description:
          'Valérie Pécresse est la candidate des Républicains. Elle a remporté la primaire des Républicains en Décembre 2021.',
        bannerUrl: '',
      },
    }),
    EM: await prisma.politician.create({
      data: {
        name: 'Emmanuel Macron',
        slug: 'emmanuel-macron',
        programUrl: 'https://avecvous.fr',
        pictureUrl: '/candidates/emmanuel-macron.png',
        politicalParty: 'La République En Marche !',
        description:
          "Emmanuel Macron est le candidat de La République En Marche !. Il est l'actuel Président de la République.",
        bannerUrl: '',
      },
    }),
    AH: await prisma.politician.create({
      data: {
        name: 'Anne Hidalgo',
        slug: 'anne-hidalgo',
        programUrl: 'https://www.2022avechidalgo.fr/notre_programme',
        pictureUrl: '/candidates/anne-hidalgo.png',
        politicalParty: 'Parti Socialiste',
        description:
          'Anne Hidalgo est la candidate du Parti Socialiste. Elle a été désignée candidate par les militants du Parti Socialiste.',
        bannerUrl: '',
      },
    }),
    MLP: await prisma.politician.create({
      data: {
        name: 'Marine Le Pen',
        slug: 'marine-le-pen',
        programUrl: 'https://mlafrance.fr/programme',
        pictureUrl: '/candidates/marine-le-pen.png',
        politicalParty: 'Rassemblement National',
        description: 'Marine Le Pen est la candidate du Rassemblement National.',
        bannerUrl: '',
      },
    }),
    EZ: await prisma.politician.create({
      data: {
        name: 'Eric Zemmour',
        slug: 'eric-zemmour',
        programUrl: 'https://programme.zemmour2022.fr',
        pictureUrl: '/candidates/eric-zemmour.png',
        politicalParty: 'Reconquête !',
        description: 'Eric Zemmour est le candidat du mouvement Reconquête !.',
        bannerUrl: '',
      },
    }),
    FR: await prisma.politician.create({
      data: {
        name: 'Fabien Roussel',
        slug: 'fabien-roussel',
        programUrl: 'https://www.fabienroussel2022.fr/le_programme',
        pictureUrl: '/candidates/fabien-roussel.png',
        politicalParty: 'Parti Communiste Français',
        description: 'Fabien Roussel est le candidat du Parti Communiste Français.',
        bannerUrl: '',
      },
    }),
  };

  const categories = [
    await await prisma.category.create({
      data: {
        title: 'Société',
        slug: 'societe',
        image: 'society',
        order: 1,
        published: true,
      },
    }),
    await await prisma.category.create({
      data: {
        title: "Fonctionnement de l'Etat et des institutions",
        slug: 'institutions',
        image: 'taxation',
        order: 2,
        published: true,
      },
    }),
    await await prisma.category.create({
      data: {
        title: 'Fiscalité',
        slug: 'fiscalite',
        image: 'taxation',
        order: 3,
        published: true,
      },
    }),
    await await prisma.category.create({
      data: {
        title: 'Politique Economique & Sociale, immigration',
        slug: 'economie',
        image: 'economy',
        order: 4,
        published: true,
      },
    }),
    await await prisma.category.create({
      data: {
        title: 'Politique Environnementale',
        slug: 'environnement',
        image: 'ecology',
        order: 5,
        published: true,
      },
    }),
    await await prisma.category.create({
      data: {
        title: 'Affaires étrangères et Défense',
        slug: 'etranger',
        image: 'foreign-affairs',
        order: 6,
        published: true,
      },
    }),
    await await prisma.category.create({
      data: {
        title: 'Justice',
        slug: 'justice',
        image: 'justice',
        order: 7,
        published: true,
      },
    }),
    await await prisma.category.create({
      data: {
        title: 'Energie',
        slug: 'energie',
        image: 'energy',
        order: 8,
        published: true,
      },
    }),
    await await prisma.category.create({
      data: {
        title: 'Santé',
        slug: 'sante',
        image: 'health',
        order: 9,
        published: true,
      },
    }),
  ];

  const survey = await parseSurvey();

  for (const category of categories) {
    const categoryQuestions = survey.find(({ title }) => title === category.title)?.questions;

    if (categoryQuestions) {
      let questionOrder = 1;
      for (const questionToCreate of categoryQuestions) {
        const question = await prisma.question.create({
          data: {
            title: questionToCreate.title,
            source: questionToCreate.source,
            categoryId: category.id,
            multichoice: false,
            order: questionOrder,
            published: true,
          },
        });

        let choiceOrder = 1;
        for (const choiceToCreate of questionToCreate.choices) {
          const choice = await prisma.choice.create({
            data: {
              text: choiceToCreate.text,
              order: choiceOrder,
              questionId: question.id,
            },
          });

          for (const [politicianInitials, politicianScoreToCreate] of Object.entries(
            choiceToCreate.politicianScores,
          )) {
            await prisma.politicianScore.create({
              data: {
                politicianId: politicians[politicianInitials as keyof typeof politicians].id,
                score: politicianScoreToCreate.score,
                source: politicianScoreToCreate.source,
                choiceId: choice.id,
              },
            });
          }
          choiceOrder++;
        }
        questionOrder++;
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
