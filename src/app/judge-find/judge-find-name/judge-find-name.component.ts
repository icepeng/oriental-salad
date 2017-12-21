import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Comparator, DatagridFilter, Filter, SortOrder } from 'clarity-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { JudgeFindNameService } from './judge-find-name.service';
import { SearchResult } from './searchResult';

class ScoreComparator implements Comparator<SearchResult> {
  compare(a: SearchResult, b: SearchResult) {
    return +a.score - +b.score;
  }
}

class RankComparator implements Comparator<SearchResult> {
  compare(a: SearchResult, b: SearchResult) {
    return a.rank - b.rank;
  }
}

class CountComparator implements Comparator<SearchResult> {
  compare(a: SearchResult, b: SearchResult) {
    return a.judgeCount - b.judgeCount;
  }
}

class RankFilter implements Filter<SearchResult> {
  checked = true;
  changes = new Subject<any>();

  constructor() {
    this.changes.next(true);
  }

  toggle() {
    this.checked = !this.checked;
    this.changes.next(true);
  }

  isActive(): boolean {
    return true;
  }

  accepts(searchResult: SearchResult) {
    return this.checked ? !!searchResult.rank : true;
  }
}

@Component({
  selector: 'app-judge-find-name',
  templateUrl: './judge-find-name.component.html',
  styleUrls: ['./judge-find-name.component.scss'],
})
export class JudgeFindNameComponent implements OnInit {
  formGroup: FormGroup;
  list: Observable<SearchResult[]>;
  // filteredList: Observable<SearchResult[]>;
  rankOrder = SortOrder.Asc;
  scoreComparator = new ScoreComparator();
  rankComparator = new RankComparator();
  countComparator = new CountComparator();
  rankFilter = new RankFilter();

  constructor(
    private judgeFindNameService: JudgeFindNameService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl(),
    });
    this.list = this.judgeFindNameService.getAll();
    // this.filteredList = this.formGroup.valueChanges
    //   .startWith({ name: '' })
    //   .combineLatest(this.list, (form, list) =>
    //     list.filter(item => item.name.includes(form.name)),
    //   );
  }

  onClick(item: SearchResult) {
    return this.router.navigate(['/', 'view', item.id, 'summary']);
  }
}
