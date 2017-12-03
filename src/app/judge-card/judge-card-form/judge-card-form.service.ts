import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JudgeCardFormService {
  dataStore: {
    index: number;
    submitAttempt: boolean;
  };
  _index: BehaviorSubject<number>;
  _submitAttempt: BehaviorSubject<boolean>;
  index: Observable<number>;
  submitAttempt: Observable<boolean>;

  constructor() {
    this.dataStore = {
      index: 0,
      submitAttempt: false
    };

    this._index = new BehaviorSubject(this.dataStore.index);
    this.index = this._index.asObservable();

    this._submitAttempt = new BehaviorSubject(this.dataStore.submitAttempt);
    this.submitAttempt = this._submitAttempt.asObservable();
  }

  init() {
    this.dataStore.index = 0;
    this._index.next(this.dataStore.index);
    this.dataStore.submitAttempt = false;
    this._submitAttempt.next(this.dataStore.submitAttempt);
  }

  prev() {
    this.dataStore.index -= 1;
    this._index.next(this.dataStore.index);
    this.dataStore.submitAttempt = false;
    this._submitAttempt.next(this.dataStore.submitAttempt);
  }

  next() {
    this.dataStore.index += 1;
    this._index.next(this.dataStore.index);
    this.dataStore.submitAttempt = false;
    this._submitAttempt.next(this.dataStore.submitAttempt);
  }

  attemptSubmit() {
    this.dataStore.submitAttempt = true;
    this._submitAttempt.next(this.dataStore.submitAttempt);
  }
}
