let area = document.querySelector("#region-radio-wrapper");
let goods = document.querySelector("#product-radio-wrapper");
// 生成一组checkbox
genGroupCheckBox(area, [{
    value: 1,
    text: "华东"
}, {
    value: 2,
    text: "华北"
}, {
    value: 3,
    text: "华南"
}]);
genGroupCheckBox(goods, [{
    value: 1,
    text: "手机"
}, {
    value: 2,
    text: "笔记本"
}, {
    value: 3,
    text: "智能音箱"
}]);
// 显示默认选项数据
renderFunc();
// select的onchange事件监听 
// area.addEventListener("change", renderFunc);
// goods.addEventListener("change", renderFunc);

// 渲染函数
function renderFunc() {
    // 生成表格
    let data = manageData();
    renderTable(data);
    // 生成柱状图
    chartA.data = data;
    chartA.graphBarChart();
    // 画默认折线图
    chartB.data = data;
    chartB.graphLineChart();
}

window.onhashchange = renderFunc;



