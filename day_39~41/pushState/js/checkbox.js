function genGroupCheckBox(wrapper, checkBoxArr) {
    // 生成全选checkbox的html，给一个自定义属性表示为全选checkbox，比如checkbox - type="all"
    let selectAll = "<div><input type='radio' checkbox-type='all' checked='true'>全选</div>"
    // 遍历参数对象 
    let chidrenBox = [];
    for (let i = 0; i < checkBoxArr.length; i++) {
        // 生成各个子选项checkbox的html，给一个自定义属性表示为子选项
        let checkbox = "<div><input type='checkbox' checkbox-type='single' checked='true'";
        let checkboxValue = "value='" + checkBoxArr[i].text + "'>" + checkBoxArr[i].text + "</div>";
        checkbox = checkbox + checkboxValue;
        chidrenBox.push(checkbox);
    }
    let chidrenBoxStr = chidrenBox.join('');
    // 容器innerHTML = 生成好的html集合
    wrapper.innerHTML = selectAll + chidrenBoxStr;
    // 给容器做一个事件委托 
    wrapper.onmouseup = function (e) {
        let oEvent = e || event;
        let target = oEvent.target || oEvent.srcElement;
        if (target.getAttribute("type") == "checkbox" || target.getAttribute("type") == "radio") {
            // 读取自定义属性
            let checkboxType = target.getAttribute("checkbox-type");
            if (checkboxType === "all") {
                // 做全选对应的逻辑
                target.onclick = function () {
                    if (this.checked) {
                        target.checked = true;  //这里直接设置DOM property,而不是Attribute。与target.setAtrribute("checked",true)不同
                        checkAll(wrapper);
                    } else {
                        target.checked = true;
                    }
                    // window.location.hash = setHash();
                    let stateObj = genSelectObj();
                    let stateText = JSON.stringify(stateObj);
                    let url = window.location.href.split("?")[0]+"?"+stateText;
                    history.pushState(stateObj, '', url);
                }
            } else {
                // 做子选项对应的逻辑
                target.onclick = function (e) {
                    if (!this.checked) {
                        if (isOnlyChecked(wrapper, this)) {
                            this.checked = true;
                        } else if (otherAllChecked(wrapper, this)) {
                            let checkAllRadio = wrapper.querySelector("input[checkbox-type='all']");
                            checkAllRadio.checked = false;
                        }
                    } else {
                        if (otherAllChecked(wrapper, target)) {
                            let checkAllRadio = wrapper.querySelector("input[checkbox-type='all']");
                            checkAllRadio.checked = true;
                        }
                    }
                    // window.location.hash = setHash();
                    let stateObj = genSelectObj();
                    let stateText = JSON.stringify(stateObj);
                    let url = window.location.href.split("?")[0]+"?"+stateText;
                    history.pushState(stateObj, '', url);
                }
            }
        }
    }
}

function isOnlyChecked(wrapper, node) {
    let nodes = wrapper.querySelectorAll("input[type='checkbox']");
    let len = nodes.length;
    for (let i = 0; i < len; i++) {
        if (nodes[i] !== node && nodes[i].checked) {
            return false;
            break;
        }
    }
    return true;
}

function otherAllChecked(wrapper, node) {
    let nodes = wrapper.querySelectorAll("input[type='checkbox']");
    let len = nodes.length;
    for (let i = 0; i < len; i++) {
        if (nodes[i] !== node && !nodes[i].checked) {
            return false;
        }
    }
    return true;
}

// 全选所有商品和地区
function checkAll(parentNode) {
    let checkboxes = parentNode.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
    }
}

// 根据location.hash选择地区
function stateCheck(wrapper,state) {
    clearCheck(wrapper);
    let stateObj = state;
    let options = wrapper.querySelectorAll("input[type='checkbox']");
    let selectArr = wrapper == area ? stateObj.area : stateObj.goods;
    for (let ri = 0; ri < selectArr.length; ri++) {
        for (let i = 0; i < options.length; i++) {
            if (selectArr[ri] == options[i].value) {
                options[i].checked = true;
            }
        }
    }
    allRadioCheck(wrapper);
}

// 清空所有选择
function clearCheck(wrapper) {
    let options = wrapper.querySelectorAll("input[type='checkbox']");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// 全选判断
function isCheckAll(nodes) {
    for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].checked) {
            return false;
        }
    }
    return true;
}

// 全选选择
function allRadioCheck(wrapper) {
    let nodes = wrapper.querySelectorAll("input[type='checkbox']");
    let checkAllRadio = wrapper.querySelector("input[checkbox-type='all']");
    if (isCheckAll(nodes)) {
        checkAllRadio.checked = true;
    } else {
        checkAllRadio.checked = false;
    }
}