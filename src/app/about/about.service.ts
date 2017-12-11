import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AboutService {
  constructor(private http: HttpClient) {}

  sendEmail(
    email: string,
    data: { name: string; email?: string; message: string },
  ) {
    return this.http.post(`https://formspree.io/${email}`, data).toPromise();
  }
}
