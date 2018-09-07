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
ajax();

// select的onchange事件监听 
area.addEventListener("change", ajax);
goods.addEventListener("change", ajax);

window.onpopstate = function () {
    // 渲染表单
    renderForm();
    let data = manageData(sourData);
    // 渲染图表
    renderChart(data);
    // 渲染表格
    renderTable(data);
};

// 渲染图表
function renderChart(data) {
    // 生成柱状图
    chartA.data = data;
    chartA.graphBarChart();
    // 画默认折线图
    chartB.data = data;
    chartB.graphLineChart();
}

// 渲染表单
function renderForm() {
    let state = history.state;
    if (state !== null) {
        // 渲染CheckBox
        stateCheck(area, state);
        allRadioCheck(area);
        stateCheck(goods, state);
        allRadioCheck(goods);
    } else {
        let hash = gethashObj();
        if (hash == null) {
            // 渲染CheckBox
            checkAll(area);
            allRadioCheck(area);
            checkAll(goods);
            allRadioCheck(goods);
        } else {
            // 渲染CheckBox
            stateCheck(area, hash);
            allRadioCheck(area);
            stateCheck(goods, hash);
            allRadioCheck(goods);
        }
    }
}



