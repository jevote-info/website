export interface QuestionAnswerDto {
  questionId: string;
  choiceId: string;
}
export interface CategoryScoreDto {
  categoryId: string;
  score: number;
  questionAnswers: QuestionAnswerDto[];
}

export interface PoliticianResultScoreDto {
  score: number;
  categoriesScores: CategoryScoreDto[];
  politicianId: string;
}

export interface ResultDto {
  politicianResultScores: PoliticianResultScoreDto[];
}
