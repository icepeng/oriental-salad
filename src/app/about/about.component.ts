import { HttpErrorResponse } from '@angular/common/http';
import { AboutService } from './about.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  formGroup: FormGroup;
  submitStatus: {
    status: 'none' | 'pending' | 'danger' | 'success';
    message: string;
  } = {
    status: 'none',
    message: '',
  };

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      message: new FormControl('', [Validators.required]),
    });
  }

  onClose() {
    this.submitStatus = {
      status: 'none',
      message: '',
    };
  }

  async onSubmit(value: { name: string; email?: string; message: string }) {
    try {
      this.submitStatus = {
        status: 'pending',
        message: '전송이 완료되었습니다. 감사합니다.',
      };
      await this.aboutService.sendEmail('typ0@naver.com', value);
      this.submitStatus = {
        status: 'success',
        message: '전송이 완료되었습니다. 감사합니다.',
      };
      this.formGroup.reset({
        name: '',
        email: '',
        message: '',
      });
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        return (this.submitStatus = {
          status: 'danger',
          message: err.error.message,
        });
      }
      throw err;
    }
  }
}
