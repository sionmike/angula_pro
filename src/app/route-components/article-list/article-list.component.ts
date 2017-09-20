import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListRouteComponent implements OnInit {

  articleArray = [{
    title: '脊柱疾病知识',
    img: 'assets/img/jizhu001.png',
    items: [
      {
        id: 1,
        title: '脊柱结核'
      },
      {
        id: 2,
        title: '椎间盘突出'
      },
      {
        id: 3,
        title: '腰椎间盘突出'
      },
      {
        id: 4,
        title: '颈椎病'
      }
    ]
  }, {
    title: '康复锻炼',
    img: 'assets/img/kangfuduanlian.png',
    items: [
      {
        id: 1,
        title: '颈托使用指导'
      },
      {
        id: 2,
        title: '下肢功能锻炼'
      },
      {
        id: 3,
        title: '颈部功能锻炼'
      },
      {
        id: 4,
        title: '胸腰托使用指导'
      }
    ]
  }, {
    title: '脊柱外科康复',
    img: 'assets/img/jizhukangfu.png',
    items: [
      {
        id: 1,
        title: '腰背肌锻炼'
      },
      {
        id: 2,
        title: '腰部功能锻炼'
      },
      {
        id: 3,
        title: '呼吸功能锻炼'
      },
      {
        id: 4,
        title: '上肢功能锻炼'
      }
    ]
  }, {
    title: '日常护理',
    img: 'assets/img/richanghuli.png',
    items: [
      {
        id: 1,
        title: '压疮预防'
      },
      {
        id: 2,
        title: '压疮护理'
      },
      {
        id: 3,
        title: '围麻醉期'
      },
      {
        id: 4,
        title: '轴向翻身'
      }
    ]
  }, {
    title: '饮食营养',
    img: 'assets/img/yinshi002.png',
    items: [
      {
        id: 1,
        title: '颈椎病食疗法'
      },
      {
        id: 2,
        title: '心脏病食疗法'
      },
      {
        id: 3,
        title: '肾脏患者饮食注意'
      },
      {
        id: 4,
        title: '骨科饮食'
      }
    ]
  }, {
    title: '手术护理',
    img: 'assets/img/shoushuhuli.png',
    items: [
      {
        id: 1,
        title: '术前准备'
      },
      {
        id: 2,
        title: '颈椎病术前准备'
      },
      {
        id: 3,
        title: '颈椎病术后准备'
      },
      {
        id: 4,
        title: '颈椎前路术后注意事项'
      }

    ]
  }, {
    title: '乳腺癌治疗方法',
    img: 'assets/img/ruxianai.png',
    items: [
      {
        id: 1,
        title: '宫腔镜检查'
      },
      {
        id: 2,
        title: '心态调整'
      },
      {
        id: 3,
        title: '住院注意'
      },
      {
        id: 4,
        title: '日常生活'
      }
    ]
  }, {
    title: '出院护理',
    img: 'assets/img/chuyuan.png',
    items: [
      {
        id: 1,
        title: '腰椎间盘突出家庭护理'
      },
      {
        id: 2,
        title: '卧床患者的家庭护理'
      },
      {
        id: 3,
        title: '尿管患者的家庭护理'
      },
      {
        id: 4,
        title: '选择合适的枕头'
      }
    ]
  }, {
    title: '情绪管理',
    img: 'assets/img/qingxuguanli.png',
    items: [
      {
        id: 1,
        title: '调整心情积极应对'
      },
      {
        id: 2,
        title: '术中情绪控制'
      },
      {
        id: 3,
        title: '术后康复情绪指导'
      },
      {
        id: 4,
        title: '住院期间情绪指导'
      }
    ]
  }, {
    title: '中风',
    img: 'assets/img/zhongfeng.png',
    items: [
      {
        id: 1,
        title: '什么是中风病'
      },
      {
        id: 2,
        title: '中风病用药指导'
      },
      {
        id: 3,
        title: '中风病饮食疗法'
      },
      {
        id: 4,
        title: '中风病用药指导'
      }
    ]
  }, {
    title: '高血压疾病知识',
    img: 'assets/img/gaoxueya.jpg',
    items: [
      {
        id: 1,
        title: '高血压是什么'
      },
      {
        id: 2,
        title: '高血压的成因'
      },
      {
        id: 3,
        title: '高血压如何治疗'
      },
      {
        id: 3,
        title: '高血压饮食注意'
      }
    ]
  }, {
    title: '中医治疗',
    img: 'assets/img/zhongyi.png',
    items: [
      {
        id: 1,
        title: '耳部保健操'
      },
      {
        id: 2,
        title: '悬灸'
      },
      {
        id: 3,
        title: '穴位敷贴'
      },
      {
        id: 3,
        title: '中药冷敷'
      }
    ]
  }];
  constructor() { }

  ngOnInit() {
  }

}
