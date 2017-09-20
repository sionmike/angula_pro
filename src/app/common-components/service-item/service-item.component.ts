import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'yh-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss']
})
export class ServiceItemComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  @Input() serviceItem: any = {};
  @Input() type: string;
}
