export interface CategoryScoreDto {
  categoryId: string;
  score: number;
}

export interface PoliticianResultScoreDto {
  score: number;
  categoriesScores: CategoryScoreDto[];
  politicianId: string;
}

export interface ResultDto {
  politicianResultScores: PoliticianResultScoreDto[];
}
