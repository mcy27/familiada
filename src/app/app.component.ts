import {Component, OnInit} from '@angular/core';
import {AppState} from "./models/appState.enum";
import {IQuestionAnswer} from "./models/QuestionAnswer.model";
import {QuestionAnswerSeed} from "../assets/seed/questionAnswer.seed";
import {LocalStorageService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'familiada';
  appState: AppState = AppState.MENU;
  AppState = AppState;
  questionAnswers: IQuestionAnswer[][] = QuestionAnswerSeed.questionAnswerSeed;
  questionAnswersAdded: IQuestionAnswer[][] = [];
  actualQuestionAnswer: IQuestionAnswer[] | undefined;
  setsLocalStorageName: string[] = [];
  constructor(private localStorage: LocalStorageService) {
  }
  ngOnInit() {
    this.getQuestionAnswersAddedFromLocalStorage()
  }

  getQuestionAnswersAddedFromLocalStorage() {
    for (let i = 0; i < 10; i++) {
      if(this.localStorage.getItem('set-' + i))
      {
        let qaa = this.localStorage.getItem('set-' + i);
        this.questionAnswersAdded.push(qaa);
        this.setsLocalStorageName.push('set-' + i)
      }
    }
  }

  deleteQA(index: number) {
    this.localStorage.removeItem(this.setsLocalStorageName[index]);
    window.location.reload();
  }

  choseQuestionAnswer(questionAnswer: IQuestionAnswer[]) {
    this.appState = AppState.MANAGEMENT;
    this.actualQuestionAnswer = questionAnswer;
  }

  setFinal() {
    this.appState = AppState.FINAL;
  }
  setFinalManagement() {
    this.appState = AppState.FINAL_MANAGEMENT;
  }
  setAddQuestions() {
    this.appState = AppState.ADD_QUESTIONS;
  }
}
