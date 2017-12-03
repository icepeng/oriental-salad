import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-explain-value',
  templateUrl: './explain-value.component.html',
  styleUrls: ['./explain-value.component.scss']
})
export class ExplainValueComponent implements OnInit {
  @Input() value: number;

  constructor() { }

  ngOnInit() {
  }

}
