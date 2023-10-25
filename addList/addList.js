function createTable(containerId, options) {
  const {
    title,
    x,
    y,
    singularRowColor,
    evenRowColor,
    rowHeight,
    columnWidth,
    columnClasses,
    addCheckbox,
    enableRowClickToCheck
  } = options;

  // 找到要创建表格的DIV元素
  const container = document.getElementById(containerId);

  // 创建表格元素
  const table = document.createElement("table");

  // 创建表格标题行
  const titleRow = table.insertRow();
  titleRow.className = "title-row"; 

  let checkAllCheckbox; 

  if (addCheckbox) {
    const checkboxCell = titleRow.insertCell();
    checkboxCell.className = "checkbox-cell";
    checkAllCheckbox = document.createElement("input");
    checkAllCheckbox.type = "checkbox";
    checkAllCheckbox.className = "checkbox-class";
    checkboxCell.appendChild(checkAllCheckbox);

    // 添加全选复选框的事件监听器
    checkAllCheckbox.addEventListener("change", function () {
      const isChecked = checkAllCheckbox.checked;
      const checkboxes = document.querySelectorAll(".content-checkbox");
      for (const checkbox of checkboxes) {
        checkbox.checked = isChecked;
        const row = checkbox.closest("tr");
        if (isChecked) {
          row.classList.add("selected-row");
        } else {
          row.classList.remove("selected-row");
        }
      }
    });
  }

  for (let i = 0; i < title.length; i++) {
    const titleCell = titleRow.insertCell();
    titleCell.textContent = title[i];
    titleCell.className = columnClasses[i];
  }

  // 创建表格内容
  for (let i = 0; i < x; i++) {
    const row = table.insertRow();
    row.style.height = rowHeight + "px";
    row.className = `row${i + 1}`;

    if (addCheckbox) {
      const checkboxCell = row.insertCell();
      checkboxCell.className = "checkbox-cell";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "checkbox-class content-checkbox"; // 增加 content-checkbox 类名
      checkboxCell.appendChild(checkbox);

      if (enableRowClickToCheck) {
        checkbox.addEventListener("click", function (event) {
          event.stopPropagation(); // 阻止事件冒泡，以防止触发行点击事件
        });
      }

      // 添加行复选框的事件监听器
      checkbox.addEventListener("change", function () {
        const isChecked = checkbox.checked;
        if (isChecked) {
          row.classList.add("selected-row");
        } else {
          row.classList.remove("selected-row");
        }
        updateCheckAllCheckboxState();
      });
    }

    for (let j = 0; j < y; j++) {
      const cell = row.insertCell();
      cell.style.backgroundColor = i % 2 === 0 ? evenRowColor : singularRowColor;
      cell.style.width = columnWidth + "px";
      cell.className = columnClasses[j];
    }

    if (enableRowClickToCheck) {
      row.addEventListener("click", function () {
        if (addCheckbox) {
          const checkbox = row.querySelector(".content-checkbox");
          if (checkbox) {
            checkbox.checked = !checkbox.checked;
            const isChecked = checkbox.checked;
            if (isChecked) {
              row.classList.add("selected-row");
            } else {
              row.classList.remove("selected-row");
            }
            updateCheckAllCheckboxState();
          }
        }
      });
    }
  }

  // 更新全选复选框的状态
  function updateCheckAllCheckboxState() {
    const checkboxes = document.querySelectorAll(".content-checkbox");
    const allChecked = [...checkboxes].every((checkbox) => checkbox.checked);
    checkAllCheckbox.checked = allChecked;
  }

  // 清空容器DIV并将新表格添加到其中
  container.innerHTML = "";
  container.appendChild(table);
}