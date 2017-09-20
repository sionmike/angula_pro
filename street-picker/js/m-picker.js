/**
 * Created by dongsj on 2017/3/22.
 */

var t = 0;
var fs = 0;
function resizeHtmlFont() {
  t = $("html").width();

  // if (t > 1200) {
  //   fs = 75;
  // } else {
  //   fs = 64;
  // }
  t < 1024 ? fs = 64 : t > 1200 ? fs = 75 : fs = t / 16;
  $("body,html").attr("style", "font-size:" + fs + "px;");
}

resizeHtmlFont();
$(document).ready(function () {
  resizeHtmlFont()
});

function initMap(svgName,localStorageName) {
  // var map = kartograph.map('#map');
  // map.loadMap('./svg/' + svgName + '.svg', function (map) {
  //
  //   map.addLayer('layer0', {
  //     name: 'hefei',
  //     styles: {
  //       stroke: 'rgba(0,0,0,0)',
  //       fill: 'rgba(0,0,0,0)'
  //     },
  //     mouseenter: function (d, path) {
  //       path.attr('fill', 'rgba(111,111,111,0.3)');
  //       path.attr('stroke', 'rgba(0,0,0,0)');
  //     },
  //     mouseleave: function (d, path) {
  //       path.attr('fill', 'rgba(0,0,0,0)');
  //     },
  //     click: function(data, path, event) {
  //       console.log(path);
  //       console.log(path.node.id);
  //       localStorage.street=path.id;
  //     }
  //   });
  // }, {padding: 0});

  var div = $('<div />').addClass('mapnail');
  $('#map').append(div);
  $.get('./svg/' + svgName + '.svg', function (svg) {
    var map = kartograph.map(div, fs * 16, fs * 16 / 1200 * 950);
    map.setMap(svg);
    map.addLayer('layer0', {
      name: 'hefei',
      styles: {
        stroke: '#fff',
        fill: '#00c6c6'
      },
      mouseenter: function (d, path) {
        // path.animate({fill: '#f6f4f2'}, 1000);
        // path.attr('stroke', 'rgba(0,0,0,0)');
        path.animate({fill: '#01aeae'}, 200);
      },
      mouseleave: function (d, path) {
        // path.attr('fill', 'rgba(111,111,111,0.1)');
        path.animate({fill: '#00c6c6'}, 200);
      },
      click: function (data, path, event) {
        // console.log(svgName == 'hefei' ? path.id.toString(): svgName + path.id.toString());
        localStorage.setItem(localStorageName,  svgName=='hefei'?path.id.toString():svgName + path.id.toString());
        // console.log(localStorage.getItem(localStorageName));
        localStorage.setItem('street1',1);
        localStorage.setItem('street2',1);
      }
    });
  });
}
function addStreetText(arr) {
  for (var i = 0; i < arr.length; i++) {
    sr = arr[i];
    var html = '';
    html = '<div class="street" style="left: ' + (sr.x * fs * 16 / 1200 - 1.5*fs) + 'px; top:' + sr.y * fs * 16 / 1200 + 'px"><p>' + sr.name + '<br>卫生服务中心</p></div>';
    $('.container .mapnail').append(html);
  }
}
