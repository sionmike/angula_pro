import {Component, OnInit, AfterViewInit, OnDestroy, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderSubmitService} from '../../services/entity/entity-service/order-submit.service';
import {Subscription} from "rxjs";

@Component({
  templateUrl: './order-submit.component.html',
  styleUrls: ['./order-submit.component.scss']
})
export class OrderSubmitRouteComponent implements OnInit,AfterViewInit,OnDestroy {
  serviceDetail: any = {
    img: '',
    title: '',
    detail: '',
    price: '',
    id: null
  };
  showMoadal: boolean = false;
  modalType: string = '';
  private subscribes: Subscription[] = [];
  date: any[];
  time: any[];
  servingTime: any[];
  patientList: any[];
  relationList: any[];
  chooseNum: number = 0;
  areas: any[] = [
    {area: '巢湖市'},
    {area: '居巢区'},
    {area: '庐江县'},
    {area: '瑶海区'},
    {area: '庐阳区'},
    {area: '蜀山区'},
    {area: '包河区'},
    {area: '长丰县'},
    {area: '肥东县'},
    {area: '肥西县'},
    {area: '高新区'},
    {area: '中区'},
    {area: '其它区'}
  ];
  userAddressId: number;
  submitData: any = {
    item: {
      itemId: null
    },
    userAddressId: null,
    servingTime: '',
    notes: ''
  };
  addressFormData: any = {
    name: '',
    sex: null,
    birthday: '',
    phone: null,
    address: {
      province: '安徽省',
      city: '合肥市',
      district: '',
      addressDetail: ''
    },
    relation: ''
  };

  constructor(private activatedRoute: ActivatedRoute, private orderSubmitService: OrderSubmitService, private router: Router, private elementRef: ElementRef) {
    activatedRoute.params.subscribe(
      (param: any) => {
        let sub1:Subscription = this.orderSubmitService.getPatientInfo(param['serviceId']).subscribe((response: any) => {
          this.serviceDetail = {
            img: response.item.pic,
            title: response.item.title,
            detail: response.item.desc,
            price: response.item.price,
            id: parseInt(response.item.itemId)
          };
          this.submitData['item'].itemId = parseInt(response.item.itemId);
          this.servingTime = response.servingTime;
          this.date = this.servingTime.map((item) => {
            return {date: item.date, choose: item.choose}
          });
          this.date = this.date.filter((item) => {
            return item.choose;
          });
          this.patientList = response.patientList;
          for (let i = 0; i < this.patientList.length; i++) {
            if (this.patientList[i].default == true) {
              this.chooseNum = i;
              this.submitData['userAddressId'] = this.patientList[i].userAddressId;
            }
          }
        });
        let sub2:Subscription = this.orderSubmitService.getRelationList().subscribe((response: any) => {
          this.relationList = response.relationList;
        });
        this.subscribes.push(sub1);
        this.subscribes.push(sub2);
      }
    );
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-green',
      radioClass: 'iradio_square-green'
    });
  }

  onDateChangeClick(e) {
    let day: string = e.target.value;
    for (let date of this.servingTime) {
      if (date.date === day) {
        this.time = date.time.filter((item) => {
          return item.choose;
        });
      }
    }
  }

  orderSubmit() {
    this.submitData['servingTime'] = parseInt(this.submitData['servingTime']);
    this.orderSubmitService.orderSumit(parseInt(this.serviceDetail['id']), this.submitData).subscribe(
      (response: any) => {
        this.router.navigate(['/order-detail', response.orderId]);
      });
  }

  onDelAddressClick(patient: {}) {
    swal({
        title: "提醒",
        html: false,
        text: "确定删除该患者吗？",
        confirmButtonColor: "#00BABF",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: '取消'
      }, () => {
        let sub:Subscription = this.orderSubmitService.delPatient(parseInt(patient['userAddressId'])).subscribe((response: any) => {
          for (let i = 0; i < this.patientList.length; i++) {
            if (parseInt(this.patientList[i].userAddressId) == parseInt(patient['userAddressId'])) {
              this.patientList.splice(i, 1);
            }
          }
          swal({
            title: "提醒",
            html: false,
            text: "删除患者成功！",
            confirmButtonColor: "#00BABF",
            showCancelButton: false,
            confirmButtonText: "确定",
          });
        });
        this.subscribes.push(sub);
      }
    );
  }

  onAddAddressClick() {
    this.showMoadal = true;
    this.modalType = 'new';
    $(this.elementRef.nativeElement.querySelector('#sex1')).iCheck('check');
    this.addressFormData = {
      name: '',
      sex: null,
      birthday: '',
      phone: null,
      address: {
        province: '安徽省',
        city: '合肥市',
        district: '',
        addressDetail: ''
      },
      relation: ''
    };
    setTimeout(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
      });
      $(this.elementRef.nativeElement.querySelector('#sex1')).iCheck('check');
    },500);
  }

  onEditAddressClick(patient: {}) {
    this.showMoadal = true;
    this.modalType = 'edit';
    let relation: number;
    for (let i = 0; i < this.relationList.length; i++) {
      if (this.relationList[i].relation == patient['relation']) {
        relation = this.relationList[i].id;
      }
    }
    this.userAddressId = parseInt(patient['userAddressId']);
    let date = new Date(patient['birthday']);
    let d: string = date.getFullYear() + '-' + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
    this.addressFormData = {
      name: patient['name'],
      sex: patient['sex'],
      birthday: d,
      phone: patient['phone'],
      address: {
        province: '安徽省',
        city: '合肥市',
        district: patient['address'].district,
        addressDetail: patient['address'].addressDetail
      },
      relation: relation
    };
    setTimeout(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
      });
      if (patient['sex'] == '男') {
        $(this.elementRef.nativeElement.querySelector('#sex1')).iCheck('check');
      } else {
        $(this.elementRef.nativeElement.querySelector('#sex0')).iCheck('check');
      }
    },500);
  }

  onSubmit() {
    this.addressFormData['sex'] = $(this.elementRef.nativeElement.querySelector('#sex1'))[0]['checked'] ? '男' : '女';
    if (this.addressFormData['relation']) {
      this.addressFormData['relation'] = parseInt(this.addressFormData['relation']);
    }
    if (this.addressFormData['birthday']) {
      this.addressFormData['birthday'] = this.addressFormData['birthday'].replace('-', '年');
      this.addressFormData['birthday'] = this.addressFormData['birthday'].replace('-', '月');
      this.addressFormData['birthday'] += '日';
    }
    if (this.modalType == 'new') {
      this.addPatientRequest();
    } else if (this.modalType == 'edit') {
      this.editPatientRequest();
    }
  }

  addPatientRequest() {
    let sub:Subscription  = this.orderSubmitService.addPatient(this.addressFormData).subscribe((response: any) => {
        this.showMoadal = false;
        this.modalType = '';
        this.patientList.push(response.patient);
        this.chooseNum = this.patientList.length - 1;
        this.submitData['userAddressId'] = this.patientList[this.chooseNum].userAddressId;
        swal({
          title: "成功提示",
          html: false,
          text: "添加患者成功！",
          confirmButtonColor: "#00BABF",
          showCancelButton: false,
          confirmButtonText: "确定",
        });
      });
    this.subscribes.push(sub)
  }

  editPatientRequest() {
    let sub:Subscription = this.orderSubmitService.editpatient(this.userAddressId, this.addressFormData).subscribe((response: any) => {
        this.showMoadal = false;
        this.modalType = '';
        for (let patient of this.patientList) {
          if (patient.userAddressId == this.userAddressId) {
            patient = Object.assign(patient, this.addressFormData);
          }
          swal({
            title: "成功提示",
            html: false,
            text: "修改成功！",
            confirmButtonColor: "#00BABF",
            showCancelButton: false,
            confirmButtonText: "确定",
          });
        }
      });
    this.subscribes.push(sub);
  }

  ngOnDestroy() {
    for (let sub of this.subscribes) {
      sub.unsubscribe();
    }
  }

}
