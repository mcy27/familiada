import {Component, ElementRef, OnInit} from '@angular/core';
import {IAnswer} from "../../models/answer.model";
import {FullscreenApiService} from "../../services/fullscreen-api.service";

// @ts-ignore
@Component({
  selector: 'app-final-view',
  templateUrl: './final-view.component.html',
  styleUrls: ['./final-view.component.scss']
})
export class FinalViewComponent implements OnInit {


  allAnswers: IAnswer[] = [
    {answer: '', points: 0, active: false},
    {answer: '', points: 0, active: false},
    {answer: '', points: 0, active: false},
    {answer: '', points: 0, active: false},
    {answer: '', points: 0, active: false},
    {answer: '', points: 0, active: false},
    {answer: '', points: 0, active: false},
    {answer: '', points: 0, active: false},
    {answer: '', points: 0, active: false},
    {answer: '', points: 0, active: false},
  ];
  srcSound: string = ''
  points: number = 0;
  timeLeft: number = 0;
  interval?: any;
  fullScreen: boolean = false;

  constructor(private elementRef: ElementRef, private fullscreenApiService: FullscreenApiService) {
  }

  ngOnInit(): void {
    this.setListener();
    this.initializeFullScreenButtonApi();
  }

  openFullScreen() {
    this.fullscreenApiService.openCloseFullScreen();
    this.fullScreen = true;
  }

  initializeFullScreenButtonApi(): void {
    this.fullscreenApiService.fullScreenBackgroundElement = this.elementRef.nativeElement;
  }

  setListener = () => {
    window.addEventListener('storage', (event) => {
      if (event.newValue && event.key == 'Answers') {
        this.allAnswers = JSON.parse(event.newValue);
        this.getPoints();
      }
      if (event.newValue && event.key == 'Timer') {
        this.setTimer(JSON.parse(event.newValue))
      }
    }, false);
  }

  setTimer(seconds: number) {
    this.timeLeft = seconds;
    this.interval = setInterval(() => {
      this.timeLeft--
      if(this.timeLeft === 0 && this.interval) {
        this.srcSound = '../../assets/sounds/czas-final-familiada.mp3';
        setTimeout(() => {
          this.srcSound = '';
        }, 1000)
        clearInterval(this.interval)
      }
    }, 1000)
  }

  getPoints() {
    this.points = 0;
    this.allAnswers.forEach(answer => {
      if (answer.active) {
        this.points = this.points + answer.points;
      }
    })
  }

}
