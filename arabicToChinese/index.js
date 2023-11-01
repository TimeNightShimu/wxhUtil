// 用法
document.addEventListener("DOMContentLoaded", function() {
  // 配置选项，包括标题、行高、列宽、每列的类名、是否添加复选框以及是否启用行点击选中功能
  const tableOptions = {
    title: ["第一列", "第二列", "第三列", "第四列", "第五列"],
    x: 13, // 行数
    y: 5, // 列数
    singularRowColor: "#FFFFFF", // 单数行的背景色
    evenRowColor: "#FAFAFA", // 双数行的背景色
    rowHeight: 56, // 设置行高
    columnWidth: 192, // 设置列宽
    columnClasses: ["column1", "column2", "column3", "column4", "column5"], // 为每列设置类名
    addCheckbox: true, // 是否在开头添加复选框
    enableRowClickToCheck: true // true则点击一行的任意位置都可选中复选框
  };

  // 调用函数创建表格，并传递容器的 ID
  createTable("youListDivName", tableOptions);
});