const PrismaClient = require('@prisma/client').PrismaClient;

const prisma = new PrismaClient();

async function fillEmptyScores() {
  const politicians = await prisma.politician.findMany({
    include: { politicianScores: true },
  });

  const choices = await prisma.choice.findMany();

  const scoresToCreate = [];

  for (const politician of politicians) {
    for (const choice of choices) {
      if (!politician.politicianScores.find(score => score.choiceId === choice.id)) {
        scoresToCreate.push({
          politicianId: politician.id,
          choiceId: choice.id,
          score: 0,
        });
      }
    }
  }

  await prisma.politicianScore.createMany({
    data: scoresToCreate,
  });
}

fillEmptyScores();
