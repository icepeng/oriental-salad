export interface Comment {
  value: number;
  potential: number;
  description: string;
  cardCode: string;
  upload: {
    id: string;
    name: string;
  };
}

export interface Comments {
  maxValueJudge: Comment;
  minValueJudge: Comment;
  maxPotentialJudge: Comment;
  minPotentialJudge: Comment;
  mostAccurateJudge: Comment;
  mostWrongJudge: Comment;
  longestJudge: Comment;
}
