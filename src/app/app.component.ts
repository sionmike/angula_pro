import {Component, AfterViewInit, OnInit} from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit,OnInit {
  constructor(private router: Router) {
    localStorage['dpt'] = 'hf-yxhlb';
    // localStorage['dpt'] = '309jizhu';
  }

  currentUrl: string;

  ngAfterViewInit(): void {
    function resizeHtmlFont() {
      let t = $("html").width();
      t < 1024 ? $("body,html").attr("style", "font-size:64px;") : t > 1200 ? $("body,html").attr("style", "font-size:75px;") : $("body,html").attr("style", "font-size:" + t / 16 + "px;")
    }

    resizeHtmlFont();
    $(document).ready(function () {
      resizeHtmlFont()
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if ((event instanceof NavigationEnd)) {
        document.body.scrollTop = 0;
        this.currentUrl = this.router.url;
      }
    })
  }
}
