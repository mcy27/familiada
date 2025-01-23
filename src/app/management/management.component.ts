import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {BoardResult, IBoardResult} from "../models/boardResult.model";
import {IQuestionAnswer} from "../models/QuestionAnswer.model";
import {QuestionAnswerSeed} from "../../assets/seed/questionAnswer.seed";
import {IAnswer} from "../models/answer.model";
import {FullscreenApiService} from "../services/fullscreen-api.service";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  @Input() questionsAnswers: IQuestionAnswer[] | undefined;
  teamZeroResult: IBoardResult;
  teamOneResult: IBoardResult;
  questionScore: number;
  actualQuestion: IQuestionAnswer | null = null;
  indexActualQuestion: number = 0;
  srcSound: string = '';
  fullScreen: boolean = false;
  constructor(private elementRef: ElementRef, private fullscreenApiService: FullscreenApiService) {
    this.teamZeroResult = new BoardResult(0);
    this.teamOneResult = new BoardResult(0);
    this.questionScore = 0;
    if (this.questionsAnswers) {
      this.actualQuestion = this.questionsAnswers[0];
    }
  }

  ngOnInit(): void {
    this.teamZeroResult = new BoardResult(0);
    this.teamOneResult = new BoardResult(0);
    this.questionScore = 0;
    this.initializeFullScreenButtonApi();
    this.fullscreenApiService.openCloseFullScreen();
    if (this.questionsAnswers) {
      this.actualQuestion = this.questionsAnswers[0];
    }
  }

  setLosses(lossCount: number, setLoss: boolean, teamNumber: 0 | 1): void {
    let team;
    team = teamNumber ? this.teamOneResult : this.teamZeroResult;
    if (lossCount === 1) {
      team.lossOne = setLoss;
    } else if (lossCount === 2) {
      team.lossTwo = setLoss;
    } else if (lossCount === 3) {
      team.lossThree = setLoss;
    } else if (lossCount === 4) {
      team.lossBig = setLoss;
    }
    if (setLoss) {
      this.srcSound = '../../assets/sounds/bledna-familiada.mp3';
      setTimeout(() => {
        this.srcSound = '';
      }, 1000)
    }
  }

  initializeFullScreenButtonApi(): void {
    this.fullscreenApiService.fullScreenBackgroundElement = this.elementRef.nativeElement;
  }

  openFullScreen() {
    this.fullscreenApiService.openCloseFullScreen();
    this.fullScreen = true;
  }

  changeActiveQuestion(ans: IAnswer) {
    ans.active = !ans.active;
    if(ans.active) {
        this.srcSound = '../../assets/sounds/dobra-odpowiedz-familiada.mp3';
        setTimeout(() => {
          this.srcSound = '';
        }, 1000)
    }
    this.setPoints();
  }

  setPoints(): void {
    this.questionScore = 0
    this.actualQuestion?.answer.forEach(ans => {
      if (ans.active && this.actualQuestion?.multiplier) {
        this.questionScore = this.questionScore + (ans.points * this.actualQuestion.multiplier);
      }
    })
  }

  addPointsNextQuestion(team: 0 | 1) {
    if (team === 0) {
      this.teamZeroResult = new BoardResult(this.teamZeroResult.score + this.questionScore);
      this.teamOneResult = new BoardResult(this.teamOneResult.score);
    } else {
      this.teamZeroResult = new BoardResult(this.teamZeroResult.score);
      this.teamOneResult = new BoardResult(this.teamOneResult.score + this.questionScore);
    }
    this.indexActualQuestion++;
    if(!(this.questionsAnswers) || this.questionsAnswers[this.indexActualQuestion]) {
      if (this.questionsAnswers) {
        this.actualQuestion = this.questionsAnswers[this.indexActualQuestion];
      }
    }
    else {
      this.actualQuestion = null;
    }
    this.questionScore = 0;
      this.srcSound = '../../assets/sounds/przed-i-po-rundzie-familiada.mp3';
      setTimeout(() => {
        this.srcSound = '';
      }, 5000)
  }
}
