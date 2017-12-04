import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-judge-card-result',
  templateUrl: './judge-card-result.component.html',
  styleUrls: ['./judge-card-result.component.scss'],
})
export class JudgeCardResultComponent implements OnInit {
  id: string;
  link: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.link = `http://icepeng.github.io/view/${this.id}`;
    });
  }
}
