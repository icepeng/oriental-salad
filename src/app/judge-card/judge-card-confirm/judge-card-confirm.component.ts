import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Card } from '../card';
import { JudgeCardService } from '../judge-card.service';

@Component({
  selector: 'app-judge-card-confirm',
  templateUrl: './judge-card-confirm.component.html',
  styleUrls: ['./judge-card-confirm.component.scss'],
})
export class JudgeCardConfirmComponent implements OnInit {
  list: Observable<Card[]>;
  name: string;

  constructor(private judgeCardService: JudgeCardService) {}

  ngOnInit() {
    this.list = this.judgeCardService.cardListJudged;
  }

  onSubmit() {
    this.judgeCardService.submit(this.name);
  }
}
