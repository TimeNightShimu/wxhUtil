var shouldStop;
var isPlay = false;  // 标志变量，初始值为 false

{
  let folderPath = "busyImg/";  // 文件夹路径
  let imageCount = 36;  // 图片总数量
  let name = "busy"; // 不带编号的图片名称 比如busy1 就写busy
  let frameRate = 24;//在这里修改每秒播放帧数
  let imgEl = document.getElementById("imgEl");
  loadImg(folderPath,imageCount,name,function(data){
    if (data == "done") {
      document.getElementById("start").addEventListener("click", function() {
        start_img(imgEl,frameRate,function(data2) {
          if (data2 === "start") {
            imgEl.style.display = "block";
          }
        });
      });
      document.getElementById("stop").addEventListener("click", function() {
        stop_img(imgEl, function(data2) {
          if (data2 === "stop") {
            imgEl.style.display = "none";
          }
        });
      });
    }
  });
}

function start_img(el,frameRate,callback) {
  if (isPlay) {
    return;
  }
  isPlay = true;
  shouldStop = false;
  callback("start");
  loop(el,frameRate);
}

function stop_img(el,callback) {
  shouldStop = true;
  isPlay = false;
  callback("stop");
}

function loop(el,frameRate) {
  var playImgs = document.querySelectorAll(".playImg");
  var pictureTotal = playImgs.length;
  var i = pictureTotal;
  frameRate = Math.floor(1000/frameRate);
  function iteration() {
    if (shouldStop) {
      for (let n = 0; n < playImgs.length; n++) {
        playImgs[n].style.display = "none";
      }
      return; // 如果标志变量为 true，则终止循环
    }
    setTimeout(function() {
      document.querySelectorAll(".playImg");
      var j = (i == pictureTotal) ? 1 : (i + 1);
      el.querySelector(".imgContent .ib" + j).style.display = "none";
      el.querySelector(".imgContent .ib" + i).style.display = "block";
      i--;
      if (i == 0) {
        i = pictureTotal;
      }
      iteration();
    }, frameRate);
  }
  iteration();
}

function loadImg(folderPath,imageCount,name,callback) {
  for (var i = 1; i <= imageCount; i++) {
    var img = document.createElement("img");
    img.className = "ib" + i + " playImg";
    img.src = folderPath + name + i + ".svg";
    img.style.display = "none";
    document.querySelector(".imgContent").appendChild(img);
    if (i == imageCount) {
      callback("done");
    }
  }
}


