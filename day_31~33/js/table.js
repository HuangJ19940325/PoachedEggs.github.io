// 渲染新的表格
function renderTable(data) {
    let table = document.createElement("table");
    table.innerHTML = "";
    // 输出表头：商品、地区、1月、2月、…… 12月
    let tableHead = document.createElement("tr");
    table.appendChild(tableHead);
    for (let i = 0; i < 14; i++) {
        let th = document.createElement("th");
        tableHead.appendChild(th);
    }
    if (isAreaAddvance()) {
        tableHead.childNodes[0].innerHTML = "地区";
        tableHead.childNodes[1].innerHTML = "商品";
    } else {
        tableHead.childNodes[0].innerHTML = "商品";
        tableHead.childNodes[1].innerHTML = "地区";
    }
    for (let i = 0; i < 12; i++) {
        tableHead.childNodes[i+2].innerHTML = (i+1)+"月";
    }
    // 遍历数据  输出每一行的表格HTML内容
    let tdNum = 14;
    let rsNum = rowSpanNum();
    for (let i = 0; i < data.length; i++) {
        if (data.length > 1) {
            if (i % rsNum == 0) {
                tdNum = 14;
            } else {
                tdNum = 13;
            }
        } else {
            tdNum = 14;
        }
        // 输出每一行的内容
        let tableRow = document.createElement("tr");
        for (let j = 0; j < tdNum; j++) {
            let td = document.createElement("td");
            if (tdNum == 14 && j == 0) {
                td.rowSpan = rowSpanNum();
            }
            tableRow.appendChild(td);
        }
        if (tdNum == 14) {
            if (isAreaAddvance()) {
                tableRow.childNodes[0].innerHTML = data[i].region;
                tableRow.childNodes[1].innerHTML = data[i].product;
            } else {
                tableRow.childNodes[0].innerHTML = data[i].product;
                tableRow.childNodes[1].innerHTML = data[i].region;
            }
        } else {
            if (isAreaAddvance()) {
                tableRow.childNodes[0].innerHTML = data[i].product;
            } else {
                tableRow.childNodes[0].innerHTML = data[i].region;
            }
        }
        // 12个月的数据
        let m = 0;
        for (let k = tdNum-12; k < tdNum; k++) {
            tableRow.childNodes[k].innerHTML = data[i].sale[m];
            m++;
        }
        table.appendChild(tableRow);
    }
    // 把生成的HTML内容赋给table-wrapper
    let tableWrapper = document.querySelector("#table-wrapper");
    tableWrapper.innerHTML = "";
    tableWrapper.appendChild(table);
}

// 是否将地区放在第一列
function isAreaAddvance() {
    let selectArea = [];
    let areaOptions = area.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < areaOptions.length; i++) {
        if (areaOptions[i].checked) {
            selectArea.push(areaOptions[i].value);
        }
    }
    let selectGoods = [];
    let goodsOptions = goods.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < goodsOptions.length; i++) {
        if (goodsOptions[i].checked) {
            selectGoods.push(goodsOptions[i].value);
        }
    }
    if (selectGoods.length > 1 && selectArea.length == 1) {
        return true;
    }
    return false;
}

// 合并单元格
function rowSpanNum() {
    let selectAreaNum = 0;
    let areaOptions = area.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < areaOptions.length; i++) {
        if (areaOptions[i].checked) {
            selectAreaNum++;
        }
    }
    let selectGoodsNum = 0;
    let goodsOptions = goods.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < goodsOptions.length; i++) {
        if (goodsOptions[i].checked) {
            selectGoodsNum++;
        }
    }
    if (!isAreaAddvance()) {
        let selectAreaNumStr = selectAreaNum.toString();
        return selectAreaNumStr;
    } else {
        let selectGoodsNumStr = selectGoodsNum.toString();
        return selectGoodsNumStr;
    }
}