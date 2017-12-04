
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CoreService {
  API_ADDRESS = 'http://52.78.236.175:3000/api/v1';

  constructor(private http: HttpClient) {}

}
