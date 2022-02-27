import csv from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

function isCategory(line: string[]) {
  return line[0] && !line[1];
}

function isQuestion(line: string[]) {
  return line[0] && line[1];
}

type Survey = {
  title: string;
  questions: {
    title: string;
    source?: string;
    choices: {
      text: string;
      politicianScores: Record<string, { score: number; source?: string }>;
    }[];
  }[];
}[];

export function parseSurvey(): Promise<Survey> {
  return new Promise((resolve, reject) => {
    const results: string[][] = [];
    const survey: Survey = [];

    fs.createReadStream(path.join(__dirname, '../public/survey.csv'))
      .pipe(csv({ headers: false, skipLines: 1 }))
      .on('data', data => {
        Object.values(data).find(Boolean) && results.push(data);
      })
      .on('end', () => {
        for (const line of results) {
          if (isCategory(line)) {
            survey.push({
              title: line[0],
              questions: [],
            });
          } else {
            if (isQuestion(line)) {
              survey[survey.length - 1].questions.push({
                title: line[0],
                source: line[10],
                choices: [],
              });
            }
            try {
              survey[survey.length - 1].questions[
                survey[survey.length - 1].questions.length - 1
              ].choices.push({
                text: line[1],
                politicianScores: {
                  JLM: {
                    score: +(line[2] || 0),
                    source: line[12],
                  },
                  YJ: {
                    score: +(line[3] || 0),
                    source: line[17],
                  },
                  VP: {
                    score: +(line[4] || 0),
                    source: line[13],
                  },
                  EM: {
                    score: +(line[5] || 0),
                    source: undefined,
                  },
                  AH: {
                    score: +(line[6] || 0),
                    source: line[16],
                  },
                  MLP: {
                    score: +(line[7] || 0),
                    source: line[14],
                  },
                  EZ: {
                    score: +(line[8] || 0),
                    source: line[11],
                  },
                  FR: {
                    score: +(line[9] || 0),
                    source: line[15],
                  },
                },
              });
            } catch {
              console.error(line);
              reject(line);
            }
          }
        }
        resolve(survey);
      });
  });
}
