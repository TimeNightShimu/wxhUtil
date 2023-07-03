// 生成同色系的渐变色
function generateSubtleGradientColor() {
  var baseColor = generateRandomColor();
    var startColor = lightenColor(baseColor, 20); // 起始颜色比基础颜色亮度增加20%
    var endColor = darkenColor(baseColor, 20); // 终止颜色比基础颜色亮度减少20%
    var background = "linear-gradient(to right, " + endColor + ", " + startColor  + ")";
    return background;
}

// 生成随机颜色
function generateRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// 调整颜色的亮度 颜色和需要调整的百分比
function lightenColor(color, percent) {
  var num = parseInt(color.slice(1), 16);
  var amt = Math.round(2.55 * percent);
  var R = (num >> 16) + amt;
  var G = (num >> 8 & 0x00FF) + amt;
  var B = (num & 0x0000FF) + amt;
  var newColor = "#" + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  return newColor;
}

// 调整颜色的亮度 颜色和需要调整的百分比
function darkenColor(color, percent) {
  var num = parseInt(color.slice(1), 16);
  var amt = Math.round(2.55 * percent);
  var R = (num >> 16) - amt;
  var G = (num >> 8 & 0x00FF) - amt;
  var B = (num & 0x0000FF) - amt;
  var newColor = "#" + (
    0x1000000 +
    (R > 0 ? (R > 255 ? 255 : R) : 0) * 0x10000 +
    (G > 0 ? (G > 255 ? 255 : G) : 0) * 0x100 +
    (B > 0 ? (B > 255 ? 255 : B) : 0)
    ).toString(16).slice(1);
  return newColor;
}