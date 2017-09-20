import {Component, OnInit, AfterViewInit, ElementRef, OnDestroy} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute} from '@angular/router'
import {ToolListService} from '../../services/entity/entity-service/tool-list.service';
import {Subscription} from "rxjs";

@Component({
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.scss']
})
export class ToolDetailRouteComponent implements OnInit,AfterViewInit,OnDestroy {
  toolDetail: any = {
    id: null,
    title: '',
    questions: []
  };
  private subscribes: Subscription[] = [];
  options: any[] = [];

  constructor(private location: Location, private toolListService: ToolListService, private activatedRoute: ActivatedRoute, private  elementRef: ElementRef) {
    activatedRoute.params.subscribe((param: any) => {
      let sub1:Subscription = this.toolListService.getToolDetail(param['toolId']).subscribe((response: any) => {
        let questionList: any[] = response.questionList.map((item) => {
          let ans: any[] = item.choiceOptionList.map((a) => {
            return {
              id: a.id,
              title: a.content,
              type: a.type
            }
          });
          return {
            type: item.type,
            id: item.id,
            title: item.title,
            answers: ans
          }
        });
        this.toolDetail = {
          id: response.tool.id,
          title: response.tool.name,
          questions: questionList
        };
        setTimeout(() => {
          $('input').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green'
          })
        }, 500);
      });
      this.subscribes.push(sub1);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

  showAlert() {
    let checks = this.elementRef.nativeElement.querySelectorAll('input[type="radio"]');
    this.options = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i].checked) {
        let ids = checks[i].value.split('-');
        this.options.push({
          "questionId": parseInt(ids[0]),
          "optionId": ids[1]
        });
      }
    }
    let sub2: Subscription = this.toolListService.getAnswer({
      toolId: this.toolDetail['id'],
      options: this.options
    }).subscribe((response: any) => {
      swal({
        title: response.title,
        html: true,
        text: "<h4 class='text-justify font-color-global-lighter margin-width-sm'>" + response.msg + "</h4>",
        confirmButtonColor: "#00BABF",
        confirmButtonText: "确定",
      }, () => this.location.back());
    });
    this.subscribes.push(sub2);
  }

  ngOnDestroy() {
    for (let sub of this.subscribes) {
      sub.unsubscribe();
    }
  }

}
