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

/**
 * @函数功能   {[判断传入字符串是否为数字]}
 * @param  {[string]} data 传入字符串
 * @return {Boolean}传入字符串为数字则返回true，否则返回false
 */
function isNumber(data) {
  const numberRegex = /^\d+$/;
  return numberRegex.test(data);
}

/**
 * @函数功能   {[判断传入字符串是否为中国境内手机号]}
 * @param  {[string]} data 传入字符串
 * @return {Boolean}传入字符串为手机号则返回true，否则返回false
 */
function isChinesePhoneNumber(data) {
  var pattern = /^1(3\d|4[5-9]|5[0-35-9]|6[56]|7[0-8]|8\d|9[89])\d{8}$/;
  return pattern.test(data);
}

/**
 * @函数功能   {[判断传入字符串是否为中国境内身份证号]}
 * @param  {[string]} idCardNumber 传入字符串
 * @return {Boolean}传入字符串为中国境内身份证号则返回true，否则返回false
 */
function validateChineseIDCardNumber(idCardNumber) {
  // 校验长度
  if (idCardNumber.length !== 18) {
    return false;
  }

  // 校验前17位是否为数字
  var reg = /^\d{17}$/;
  if (!reg.test(idCardNumber.substr(0, 17))) {
    return false;
  }

  // 定义系数和校验码对应关系
  var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

  // 计算校验位
  var sum = 0;
  for (var i = 0; i < 17; i++) {
    sum += parseInt(idCardNumber.charAt(i)) * factor[i];
  }
  var mod = sum % 11;
  var parityCode = parityBit[mod];

  // 校验校验位
  if (parityCode !== idCardNumber.charAt(17).toUpperCase()) {
    return false;
  }

  return true;
}
