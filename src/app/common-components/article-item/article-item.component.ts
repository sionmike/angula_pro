import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'yh-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  @Input() articleList: any = {};
}
