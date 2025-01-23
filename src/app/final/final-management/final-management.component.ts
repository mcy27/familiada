import { Component, OnInit } from '@angular/core';
import {IAnswer} from "../../models/answer.model";

@Component({
  selector: 'app-final-management',
  templateUrl: './final-management.component.html',
  styleUrls: ['./final-management.component.scss']
})
export class FinalManagementComponent implements OnInit {

  answer1Player0: IAnswer = {answer: '', points: 0, active: false}
  answer2Player0: IAnswer = {answer: '', points: 0, active: false}
  answer3Player0: IAnswer = {answer: '', points: 0, active: false}
  answer4Player0: IAnswer = {answer: '', points: 0, active: false}
  answer5Player0: IAnswer = {answer: '', points: 0, active: false}

  answer1Player1: IAnswer = {answer: '', points: 0, active: false}
  answer2Player1: IAnswer = {answer: '', points: 0, active: false}
  answer3Player1: IAnswer = {answer: '', points: 0, active: false}
  answer4Player1: IAnswer = {answer: '', points: 0, active: false}
  answer5Player1: IAnswer = {answer: '', points: 0, active: false}

  allAnswers: IAnswer[] = [
    this.answer1Player0,
    this.answer2Player0,
    this.answer3Player0,
    this.answer4Player0,
    this.answer5Player0,
    this.answer1Player1,
    this.answer2Player1,
    this.answer3Player1,
    this.answer4Player1,
    this.answer5Player1,
    ]
  points: number = 0;
  srcSound: string = '';
  timeToEnd: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setActive(answer: IAnswer, index: number) {
    answer.active = !answer.active;
    this.allAnswers[index] = answer;
    this.getPoints();
    if(answer.active) {
      this.srcSound = '../../assets/sounds/dobra-odpowiedz-familiada.mp3';
      setTimeout(() => {
        this.srcSound = '';
      }, 1000)
    }
    this.setToStorage();
  }

  setToStorage() {
    localStorage.setItem("Answers", JSON.stringify(this.allAnswers));
  }

  setToStorageTimer(event: any) {
    console.log('set')
    localStorage.setItem("Timer", JSON.stringify(this.timeToEnd));
  }

  getPoints() {
    this.points = 0;
    this.allAnswers.forEach(answer => {
      if (answer.active) {
        this.points = this.points + answer.points;
      }
    })
  }

  setIntro() {
    this.srcSound = '../../assets/sounds/intro-familiada.mp3';
    setTimeout(() => {
      this.srcSound = '';
    }, 10000)
  }

  setRepeat() {
    this.srcSound = '../../assets/sounds/powtorzenie-w-finale-familiada.mp3';
    setTimeout(() => {
      this.srcSound = '';
    }, 2000)
  }

  setEndTime() {
    this.srcSound = '../../assets/sounds/czas-final-familiada.mp3';
    setTimeout(() => {
      this.srcSound = '';
    }, 2000)
  }
}
