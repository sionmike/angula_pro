import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'yh-tool-item',
  templateUrl: './tool-item.component.html',
  styleUrls: ['./tool-item.component.scss']
})
export class ToolItemComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  @Input() toolList: any = {};
}
