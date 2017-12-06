
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CoreService {
  API_ADDRESS = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

}
