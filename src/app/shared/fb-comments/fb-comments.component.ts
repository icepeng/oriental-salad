import { NavigationEnd, Router } from '@angular/router';
import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-fb-comments',
  templateUrl: './fb-comments.component.html',
  styleUrls: ['./fb-comments.component.scss'],
})
export class FbCommentsComponent implements OnInit, OnDestroy, AfterViewInit {
  subscription: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe(() => this.reloadComment());
  }

  ngAfterViewInit() {
    this.reloadComment();
  }

  reloadComment() {
    const lb = document.getElementById('fbc');
    lb.innerHTML = `<div class="fb-comments" data-width="100%" data-href="${
      window.location.href
    } data-numposts="5"" ></div>`;
    (window as any).FB.XFBML.parse(lb);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
