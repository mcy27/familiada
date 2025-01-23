import {IAnswer} from "./answer.model";

export interface IQuestionAnswer {
  question: string;
  answer: IAnswer[];
  multiplier?: number;
  localStorageName?: string;
}
