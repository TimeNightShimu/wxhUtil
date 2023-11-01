const inputElement = document.getElementById("testkey");
const outputElement = document.getElementById("testValue");
const button = document.getElementById("test");
button.addEventListener("click", function() {
  const inputValue = inputElement.value;
  outputElement.textContent = arabicToChinese(inputValue);;
});

function arabicToChinese(number) {
  const chineseNumbers = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const chineseUnits = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿'];

  function numberToChinese(num, unitIndex) {
    const numStr = num.toString();
    let result = '';
    let lastZero = false; // 上一个字符是否为零

    for (let i = 0; i < numStr.length; i++) {
      const digit = parseInt(numStr[i]);

      if (digit !== 0) {
        if (lastZero) {
          result += chineseNumbers[0]; // 插入零
          lastZero = false;
        }

        result += chineseNumbers[digit] + chineseUnits[numStr.length - i - 1];
      } else {
        lastZero = true;
      }
    }

    if (result.endsWith(chineseNumbers[0])) {
      result = result.slice(0, -1); // 移除末尾的零
    }

    if (unitIndex > 0) {
      result += chineseUnits[unitIndex];
    }

    return result;
  }

  const parts = number.toString().split('.');
  const integerPart = parseInt(parts[0]);
  const decimalPart = parts[1] ? parseInt(parts[1]) : 0;

  if (integerPart === 0) {
    return '零元整';
  }

  let result = numberToChinese(integerPart, 0);

  if (decimalPart > 0) {
    result += '元';
    result += numberToChinese(Math.floor(decimalPart / 10), 0) + '角';
    const cent = decimalPart % 10;
    if (cent > 0) {
      result += chineseNumbers[cent] + '分';
    }
  } else {
    result += '元整';
  }

  return result;
}