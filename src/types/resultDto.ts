export interface CategoryScore {
  categoryId: number;
  score: number;
}

export interface PoliticianResultScore {
  score: number;
  categoriesScores: CategoryScore[];
  politicianId: number;
}

export interface ResultDto {
  politicianResultScores: PoliticianResultScore[];
}
