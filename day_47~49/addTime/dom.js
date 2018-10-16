// 餐厅
function resDraw() {
    var restaurantWrap = document.querySelector("#restaurantWrap");
    var restaurant = document.createElement("div");
    restaurant.id = "restaurant";
    restaurant.innerHTML = "<div id='queueArea'><p>排队区</p></div><div id='kitchen'><p>厨房</p></div><div id='lobby'><p>大厅</p><div id='seatWrap'><div id='seat'><p>状态：</p></div></div></div>";
    restaurantWrap.appendChild(restaurant);
}
// 顾客图像
function staffDraw(career) {
    var pre = "images/";
    if (career == Cook) {
        // 找到厨房
        var kitchen = document.querySelector("#kitchen");
        // 添加厨师图像
        var img = document.createElement("img");
        img.src = pre + career.name.toLowerCase() + ".png";
        img.classList.add("cook");
        kitchen.appendChild(img);
    } else if (career == Waitor) {
        // 找到餐厅
        var restaurant = document.querySelector("#restaurant");
        // 添加服务员图像
        var img = document.createElement("img");
        img.src = pre + career.name.toLowerCase() + ".png";
        img.classList.add("waitor");
        restaurant.appendChild(img);
    }
}
// 顾客图像
var cusPos = 0;
function cusDraw(name) {
    var restaurant = document.querySelector("#restaurant");
    var pre = "images/";
    var img = document.createElement("img");
    img.id = name;
    img.src = pre + name + ".png";
    img.classList.add("customer");
    img.style.bottom = cusPos + "px";
    cusPos = cusPos + 50;
    restaurant.appendChild(img);
}

// 顾客动画
function cusMoveIn() {
    // 进店
    var cusImg = document.getElementById(customer.name);
    cusImg.style.cssText += "left: calc(60% - 25px);";
    // next下移50
    for (let i = 1; i < customers.length; i++) {
        var otherCusImg = document.getElementById(customers[i].name);
        var bottom = otherCusImg.style.bottom.replace(/[^0-9]/ig, "");
        otherCusImg.style.bottom = (bottom - 50) + "px";
    }
}
function cusMoveOut() {
    // 出店
    var cusImg = document.getElementById(customer.name);
    cusImg.style.left = "100%";
}
function cusSetStatus() {
    var seat = document.querySelector("#seat");
    var status = document.createElement("p");
    status.id = "cusStatus";
    status.innerHTML = "点菜中...";
    seat.appendChild(status);
}
function cusChangeStatus(dishesNum) {
    var status = document.querySelector("#cusStatus");
    var beforeStatus = status.innerHTML;
    switch (beforeStatus) {
        case "点菜中...":
            status.innerHTML = "等待上菜";
            break;
        case "等待上菜":
            status.innerHTML = "吃菜中...";
            break;
        case "吃菜中...":
            status.innerHTML = dishesNum == 0 ? "吃完结账" : "等待下一道菜";
            if (dishesNum == 0) {
                // 删除元素
                var t = setTimeout(function (params) {
                    status.parentNode.removeChild(status);
                }, 0.5 * unitTime);
            }
            break;
        case "等待下一道菜":
            status.innerHTML = "吃菜中...";
            break;
        default:
            break;
    }
}
//创建菜单列表
function cusCreateDishes(dishes) {
    var table = document.querySelector("#seat");
    var dishesList = document.createElement("ul");
    dishesList.id = "cusDishesList";
    for (let i = 0; i < dishes.length; i++) {
        var item = document.createElement("li");
        item.innerHTML = dishes[i].name + " 未上菜";
        dishesList.appendChild(item);
    }
    table.appendChild(dishesList);
}
// 改变菜单内容
function cusDishesListChange(dishes, getdishes) {
    // 已上菜、已吃菜
    var lis = document.querySelectorAll("li");
    for (let i = 0; i < lis.length; i++) {
        if (lis[i].innerHTML.indexOf(dishes.name) !== -1) {
            var dishStatus = getdishes ? " 已上菜" : " 已吃菜";
            lis[i].innerHTML = dishes.name + dishStatus;
            lis[i].style.backgroundColor = getdishes ? "red" : "blue";
            break;
        }
    }
}
//删除菜单列表
function cusDeleteDishes() {
    var table = document.querySelector("#seat");
    var dishesList = document.querySelector("#cusDishesList");
    var t = setTimeout(function () {
        table.removeChild(dishesList);
    }, 0.5 * unitTime);
}

// 服务员动画
function waitorMoveHeriR() {
    var waitor = document.querySelector(".waitor");
    waitor.style.left = "65%";
}
function waitorMoveHeriL() {
    var waitor = document.querySelector(".waitor");
    waitor.style.left = "20%";
}
function waitorMoveUp() {
    var waitor = document.querySelector(".waitor");
    waitor.style.top = "20%";
    waitor.style.left = "85%";
}
function waitorMoveDown() {
    var waitor = document.querySelector(".waitor");
    waitor.style.top = "40%";
    waitor.style.left = "65%";
}
