import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-fb-comments',
  templateUrl: './fb-comments.component.html',
  styleUrls: ['./fb-comments.component.scss'],
})
export class FbCommentsComponent implements AfterViewInit {
  @Input() href = window.location.href;

  constructor() {}

  ngAfterViewInit() {
    const lb = document.getElementById('fbc');
    lb.innerHTML = `<div class="fb-comments" data-width="100%" data-href="${this.href} data-numposts="5"" ></div>`;
    (window as any).FB.XFBML.parse(lb);
  }
}
