import {Component, OnInit} from '@angular/core';
import {IQuestionAnswer} from "../models/QuestionAnswer.model";
import {LocalStorageService} from "../services/storage.service";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss']
})
export class AddQuestionsComponent implements OnInit {
  QuestionAnswers: IQuestionAnswer[] = [{
    question: '',
    answer: [
      {answer: '', points: 0, active: false},
      {answer: '', points: 0, active: false},
      {answer: '', points: 0, active: false},
      {answer: '', points: 0, active: false},
      {answer: '', points: 0, active: false},
    ],
    multiplier: 1,
  },
    {
      question: '',
      answer: [
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
      ],
      multiplier: 1,
    },
    {
      question: '',
      answer: [
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
      ],
      multiplier: 1,
    },
    {
      question: '',
      answer: [
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
      ],
      multiplier: 1,
    },
    {
      question: '',
      answer: [
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
      ],
      multiplier: 1,
    },
    {
      question: '',
      answer: [
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
      ],
      multiplier: 1,
    },
    {
      question: '',
      answer: [
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
      ],
      multiplier: 1,
    },
    {
      question: '',
      answer: [
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
        {answer: '', points: 0, active: false},
      ],
      multiplier: 1,
    },
  ]

  constructor(private localStorage: LocalStorageService) {
    setInterval(() => {
      console.log(this.QuestionAnswers)
    }, 3000)
  }

  ngOnInit(): void {
  }

  saveToLocalStorage() {
    for (let i = 0; i < 10; i++) {
      if(!this.localStorage.getItem('set-' + i))
      {
        this.localStorage.setItem('set-' + i, this.filterQuestions(this.QuestionAnswers))
        window.location.reload();
        break;
      }
    }

  }

  filterQuestions(questionAnswers: IQuestionAnswer[]): IQuestionAnswer[] {
    let result = questionAnswers.filter(qa => qa.question !== '');
    result.forEach(qa => {
      qa.answer = qa.answer.filter(a => a.answer !== '');
    })
    return result;
  }
}
