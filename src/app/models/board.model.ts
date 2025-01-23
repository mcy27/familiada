import {IQuestionAnswer} from "./QuestionAnswer.model";
import {IBoardResult} from "./boardResult.model";

export interface IBoard {
  questionAnswer: IQuestionAnswer;
  questionScore: number;
  teamOne: IBoardResult;
  teamTwo: IBoardResult;
  totalScore?: number;
}
