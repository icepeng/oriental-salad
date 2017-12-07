import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { JudgeFindNameService } from './judge-find-name.service';
import { SearchResult } from './searchResult';

@Component({
  selector: 'app-judge-find-name',
  templateUrl: './judge-find-name.component.html',
  styleUrls: ['./judge-find-name.component.scss'],
})
export class JudgeFindNameComponent implements OnInit {
  formGroup: FormGroup;
  list: SearchResult[];

  constructor(
    private judgeFindNameService: JudgeFindNameService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(''),
    });
  }

  async onSubmit(value: { name: string }) {
    this.list = await this.judgeFindNameService.findByName(value.name);
  }

  onClick(item: SearchResult) {
    return this.router.navigate(['/', 'view', item.id, 'summary']);
  }
}
