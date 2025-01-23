export interface IBoardResult {
    lossOne: boolean;
    lossTwo: boolean;
    lossThree: boolean;
    lossBig: boolean;
    score: number;
}

export class BoardResult implements IBoardResult {
  public lossOne: boolean = false;
  public lossBig: boolean = false;
  public lossThree: boolean = false;
  public lossTwo: boolean = false;
  public score: number;

  constructor(score: number) {
    this.score = score;
  }
}
