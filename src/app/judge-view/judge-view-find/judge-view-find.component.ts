import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { JudgeViewFindService } from './judge-view-find.service';
import { SearchResult } from './searchResult';

@Component({
  selector: 'app-judge-view-find',
  templateUrl: './judge-view-find.component.html',
  styleUrls: ['./judge-view-find.component.scss'],
})
export class JudgeViewFindComponent implements OnInit {
  formGroup: FormGroup;
  list: SearchResult[];

  constructor(
    private judgeViewFindService: JudgeViewFindService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(''),
    });
  }

  async onSubmit(value: { name: string }) {
    this.list = await this.judgeViewFindService.findByName(value.name);
  }

  onClick(item: SearchResult) {
    return this.router.navigate(['/', 'view', item.id]);
  }
}
