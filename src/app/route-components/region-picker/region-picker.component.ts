import {Component, OnInit, ElementRef} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'yh-region-picker',
  templateUrl: './region-picker.component.html',
  styleUrls: ['./region-picker.component.scss']
})
export class RegionPickerComponent implements OnInit {

  timer;
  constructor (private router:Router) {
  }

  ngOnInit() {
    localStorage.setItem('street1','');
    // localStorage.setItem('street','');
    this.timer=setInterval(()=>{
      if(localStorage.getItem('street1')!=''){
        clearInterval(this.timer);
        this.router.navigateByUrl('/street-picker/'+localStorage.getItem('region'));
      }
    },500);
  }

}
