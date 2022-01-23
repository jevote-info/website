export interface CategoryScore {
  categoryId: string;
  score: number;
}

export interface PoliticianResultScore {
  score: number;
  categoriesScores: CategoryScore[];
  politicianId: string;
}

export interface ResultDto {
  politicianResultScores: PoliticianResultScore[];
}
