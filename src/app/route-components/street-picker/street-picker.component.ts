import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser"
@Component({
  selector: 'yh-street-picker',
  templateUrl: './street-picker.component.html',
  styleUrls: ['./street-picker.component.scss']
})
export class StreetPickerComponent implements OnInit {
  url: any;
  timer;
  constructor(private activatedRoute: ActivatedRoute,private sanitizer:DomSanitizer,private router:Router) {
    this.activatedRoute.params.subscribe(
      (param: any) => {
        // this.id = param['id'];
        this.url=this.sanitizer.bypassSecurityTrustResourceUrl(`/street-picker/${param['id']}.html`)
      }
    )
  }

  ngOnInit() {
    // localStorage.setItem('street','');
    localStorage.setItem('street2','');
    this.timer=setInterval(()=>{
      if(localStorage.getItem('street2')!=''){
        clearInterval(this.timer);
        this.router.navigateByUrl('/home');
      }
    },500);
  }
}
