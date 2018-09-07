// 管理系统
function manageData() {
    let selectObj = getSelectObj();
    let dataArr = getData(selectObj);
    return dataArr;
}

// 生成选择数据对象
function genSelectObj() {
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
    let selectObj = {};
    selectObj.area = selectArea;
    selectObj.goods = selectGoods;
    return selectObj;
}

// 获取数据
function getData(sele) {
    // 遍历sourceData,找到与选择匹配的数据
    // let area = getSelectedArea();
    let aquiredDataArr = [];
    let dataArr = choseData();
    for (let i = 0; i < dataArr.length; i++) {
        let obj = dataArr[i];
        for (let ri = 0; ri < sele.area.length; ri++) {
            for (let pi = 0; pi < sele.goods.length; pi++) {
                if (obj.region === sele.area[ri] && obj.product === sele.goods[pi]) {
                    aquiredDataArr.push(obj);
                }
            }
        }
    }
    return aquiredDataArr;
}
// 查找数组中的最大值
function maxValueOfData(data) {
    let maxValue = Number(data[0]);
    for (let i = 1; i < data.length; i++) {
        if (Number(data[i]) > Number(maxValue)) {
            maxValue = Number(data[i]);
        }
    }
    return maxValue;
}

// 找到离最大值最近的是100的整数倍的数, 用这个数类代表纵轴顶点对应的数值
function findTopValue(maxValue) {
    let topValue;
    if (maxValue >= 100) {  // maxValue是三位数
        topValue = Math.ceil(maxValue / 100) * 100;
        if (topValue - maxValue >= 50) {
            topValue = topValue - 50;
        }
    } else { // maxValue是二位数
        topValue = Math.ceil(maxValue / 10) * 10;
        if (topValue - maxValue >= 5) {
            topValue = topValue - 5;
        }
    }
    return topValue;
}

// 选择源数据还是localStorage中的数据
function choseData() {
    let dataArr = sourceData;
    window.localStorage.clear();
    if (window.localStorage) {
        let storage = window.localStorage;
        if (storage.myData) {
            let myDataObj = JSON.parse(storage.myData);
            dataArr = myDataObj.data;
        }
    }
    return dataArr;
}

// 存储数据到LocalStorage
function saveDataToLocalStorage() {
    let storage = window.localStorage;
    let myData = {};
    myData.data = sourceData;
    // 遍历table 保存数据
    let table = document.querySelector("table");
    let trs = table.querySelectorAll("tr");
    for (let i = 1; i < trs.length; i++) {
        let tds = trs[i].querySelectorAll("td");
        let matchIndex = findmatchIndex(trs[i]);
        let m = 0;
        for (let j = 0; j < tds.length; j++) {
            if (!isNaN(tds[j].innerHTML)) {
                myData.data[matchIndex].sale[m] = tds[j].innerHTML;
                m++;
            }
        }
    }
    storage.myData = JSON.stringify(myData);
}

// 找到与表格中某一行数据对应的数据，返回该数据在在数组中的索引值
function findmatchIndex(tr) {
    let storage = window.localStorage;
    let myData = {};
    myData.data = sourceData;
    let pro = tr.getAttribute("pro");
    let reg = tr.getAttribute("reg");
    for (let i = 0; i < myData.data.length; i++) {
        if (pro == myData.data[i].product && reg == myData.data[i].region) {
            return i;
        }
    }
}

// 获取location hash的内容
function setHash() {
    let selObj = genSelectObj();
    let selText = JSON.stringify(selObj);
    let hash = "#" + selText;
    return hash;
}

// 从hash中获取选择的地区和商品
function getSelectObj() {
    let hashObj = gethashObj();
    if (hashObj !== null) {
        hashCheck(area);
        hashCheck(goods);
        selectObj = hashObj;
    } else {
        checkAll(area);
        allRadioCheck(area);
        checkAll(goods);
        allRadioCheck(goods);
        selectObj = genSelectObj();
    }
    return selectObj;
}