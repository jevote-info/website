export interface SurveyResultScore {
  politicianId: string;
  score: number;
}

export interface SurveyResult {
  scores: SurveyResultScore[];
  categoriesScores: {
    categoryId: string;
    scores: SurveyResultScore[];
    questionScores: {
      questionId: string;
      scores: SurveyResultScore[];
    }[];
  }[];
}
