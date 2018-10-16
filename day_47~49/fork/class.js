var btn = document.getElementsByTagName("button")[0];
var p = document.querySelector(".msg");
var restaurant2D = document.getElementById("restaurant");
var customerImg = document.querySelectorAll(".cus");
var waiterImg = document.querySelector(".waiter");
var cookerStatus = document.querySelector(".status");
var cookTime = document.querySelector(".cooktime");
var foodList = document.querySelector(".foodList");
var foodImg = document.querySelectorAll(".food");
var cus_info = document.querySelector(".cus_info");
var cusStatus = cus_info.querySelector("p");
var orderFoodList = cus_info.querySelector('ul');
var food_list = document.querySelector(".food_list");
p.innerHTML = '';

// 餐厅类
// 重写类，让类只能生成一个实例。
var restaurantSingleton = (function(){
    var instance = null;
    function Restaurant(args){
        var args = args || {};
        this.cash = args.cash || 1000000;
        this.seats = args.seats || 1;
        this.staff = args.staff || [];

        var resCash = document.createElement("p");
        resCash.innerHTML = "店铺现金：<span class = 'cashNum'>" + this.cash + "</span>元";
        restaurant2D.appendChild(resCash);
    }
    Restaurant.prototype = {
        constructor: Restaurant,
        hire: function(worker){
            this.staff.push(worker.name);
        },
        fire: function(worker){
            if (this.staff.indexOf(worker) !== -1){
                this.staff.splice(this.staff.indexOf(worker), 1);
            }
        }
    }
    return {
        name: "Restaurant",
        getInstance: function(args){
            if(instance === null){
                instance = new Restaurant(args);
            }
            return instance;
        }
    }
})();

// 职员类
// 用闭包将id变量私有化
var Staff = (function(){
    var id = 1;
    return function (name, wage){
        this.id = id;
        id += 1;
        this.name = name;
        this.wage = wage;
    }
})();
Staff.prototype.work = function(){
    console.log("do something");
}
// 为此构造函数添加一个方法使得无论调用这个方法几次都只能创建一个实例
Staff.getInstance = (function(){
    var instance = null;
    return function(){
        if (instance === null){
            instance = new Staff(arguments);
        }
        return instance;
    }
})();

// 服务员类
function Waiter(name, wage){
    Staff.call(this, name, wage);
}
Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;
Waiter.prototype.getOrder= function(customer){
    // 调用顾客点菜的方法
    let foods = customer.order();
    // 服务员记录顾客点菜
    p.innerHTML += "<br>服务员正在记录顾客点的菜...";
    console.log("服务员正在记录顾客点的菜...");
    // 通过改变class来移动
    setTimeout(function(){
        waiterImg.setAttribute('class', "waiter_to_kitchen");
    }, 500);
    
    return foods;
}
// 服务员上菜方法
Waiter.prototype.shangcai = function(food){
        p.innerHTML += "<br>服务员正在为顾客上菜=>"+food.name;
        console.log("服务员正在为顾客上菜=>"+food.name);
        // 服务员将菜从厨房端上餐桌
        setTimeout(() => {
            waiterImg.setAttribute("class", "waiter_to_table");
            foodImg[food.id].setAttribute('class', 'food_in_table');
        }, 500);
}
// 为此构造函数添加一个方法使得无论调用这个方法几次都只能创建一个实例
Waiter.getInstance = (function(){
    var instance = null;
    return function(name, wage){
        if (instance === null){
            instance = new Waiter(name, wage);
        }
        return instance;
    }
})();

// 厨师类
function Cooker(name, wage){
    Staff.call(this, name, wage);
}
Cooker.prototype = Object.create(Staff.prototype);
Cooker.prototype.constructor = Cooker;
Cooker.prototype.work = function(food){
    p.innerHTML += "<br>厨师正在烹饪出菜品=>:"+food.name;
    console.log("厨师正在烹饪出菜品=>:"+food.name);
    cookerStatus.innerHTML = "厨师正在烹饪出菜品=>:"+food.name;
    cookTime.style.color = "rgb(200, 65, 0)";
    cookTime.style.fontWeight = "bold";
    // 做菜倒计时
    for (let i = food.time; i > 0; i--){
        setTimeout(function(){
            cookTime.innerHTML = "还剩"+(food.time-i)+"秒做完";
        }, i*1000);
    }
    return food;
}
// 为此构造函数添加一个方法使得无论调用这个方法几次都只能创建一个实例
Cooker.getInstance = (function(){
    var instance = null;
    return function(name, wage){
        if (instance === null){
            instance = new Cooker(name, wage);
        }
        return instance;
    }
})();

// 顾客类
var Customer = (function(){
    var id = 1;
    return function (name){
        this.name = name;
        p.innerHTML += "顾客"+this.name+"进入餐厅";
        console.log("顾客"+this.name+"进入餐厅");

        this.id = id
        this.img = customerImg[id-1];
        this.img.setAttribute("class", "cusImg_in");
        waiterImg.setAttribute("class", "waiter_to_table");
        cus_info.style.display = "block";
        //cus_info.style.color = "rgb(62, 64, 170)"
        cusStatus.innerText = this.name + '进入餐厅：点菜中。还剩3秒点完';
        // 点菜倒计时
        for (let i = 3; i>0; i--){
            setTimeout(() => {
                if (i == 3){
                    cusStatus.innerText = this.name + '：等菜中...';
                }
                else{
                    cusStatus.innerText = this.name + '进入餐厅：点菜中。还剩'+(3-i)+'秒点完';
                }
            }, i*1000);
        }
        id++;
    }
})();

Customer.prototype = {
    constructor : Customer,
    // 随机点菜方法
    order : function(){
        let copyMenu =  menu.slice(0);
        // 点随机数个菜
        let i  = Math.ceil(Math.random()*6);
        var foods = [];

        while(i>0){
            // 菜单中第随机道菜
            let n = Math.floor(Math.random()*(copyMenu.length));
            let x = copyMenu[n];
            copyMenu.splice(n, 1);
            foods.push(x);
            i -= 1;
            p.innerHTML += "<br>顾客点菜=>:"+x.name;
            console.log("顾客点菜=>:"+x.name);
            // 点菜后在顾客头像旁显示菜名、菜状态
            let orderFood = document.createElement('li');
            orderFood.innerHTML = "菜品："+ x.name + "。     <span id="+ x.id +" >状态：未上菜</span>";
            orderFoodList.appendChild(orderFood);
        }
        return foods;
    },
    eat : function(food, foods){
        let cus = this;
        // 等待0.5秒服务员端菜上来
        setTimeout(function(){
            cusStatus.innerText = cus.name + '：用餐中...';
            var span = document.getElementById(food.id);
            span.style.color = "rgb(0, 150, 200)";
            span.style.fontWeight = "bold";
            span.innerHTML = "状态：正在吃，还剩6秒吃完。"
            // 吃菜倒计时
            for (let i = 6; i >= 0; i--){
                setTimeout(()=>{
                    span.innerHTML = "状态：正在吃，还剩"+(6-i)+"秒吃完。"
                    // 如果倒计时结束，删除信息，隐藏菜品图
                    if (i==6){
                        orderFoodList.removeChild(span.parentNode);
                        foodImg[food.id].setAttribute("class", "food");
                        // 如果所有菜都吃完，则算账
                        if (orderFoodList.childElementCount == 0){
                            cusStatus.innerText = cus.name + '：结账中...';
                            setTimeout(function(){
                                // 付钱，店铺资金增加
                                let money = cus.pay(foods);
                                let num = document.querySelector(".cashNum");
                                num.innerText = Number(num.innerText) + Number(money);
                                // 顾客离开
                                cus.img.style.left = "30px";
                                cus.img.style.top = 400+cus.id*50+"px";
                                cusStatus.innerText = cus.name + "已付钱款："+money+"元后已滚出餐厅";
                                // 服务员回到收银台旁，顾客旁信息隐藏
                                setTimeout(() => {
                                    waiterImg.setAttribute("class", "waiter");
                                    cus_info.style.display = "none";
                                }, 500)
                            },500);
                        }
                    }
                }, i*1000)
            }
            p.innerHTML += "<br>顾客用餐=>:"+food.name;
            console.log("顾客用餐=>:"+food.name);
        }, 500);
    },
    pay : function(foods){
        let sum  = 0;
        for (let food of foods){
            sum += Number(food.price);
        }
        p.innerHTML += "<br>顾客"+this.name+"用餐完毕<br>付款："+sum+"元。<br>已滚出餐厅";
        p.innerHTML += "<br><br>--------我是分割线---------<br><br>";
        console.log("顾客"+this.name+"用餐完毕.");
        console.log("顾客"+this.name+"付款："+sum+"元。");
        console.log("顾客"+this.name+"已滚出餐厅");
        console.log("---------我是分割线---------");
        return sum;
    }
}

// 菜品类
function Food(name, cost, price){
    this.name = name;
    this.cost = cost;
    this.price = price;
}
// 菜单
var menu = [
{
    name : "佛跳墙",
    price : 55,
    time : 7,
    id: 0
},
{
    name : "红烧茄子",
    price : 30,
    time : 4,
    id: 1
}, {
    name :"鱼香肉丝",
    price : 35,
    time : 4,
    id: 2
}, {
    name : "宫保鸡丁",
    price : 40,
    time : 5,
    id: 3
}, {
    name : "醋溜白菜",
    price : 25,
    time : 4,
    id: 4
}, {
    name : "烧花鸭",
    price : 45,
    time : 5,
    id: 5
}
];
// 顾客队列
 var customers = ["Joy", "Panny", "Marry"];

// 程序等待函数
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
};

// 餐厅运行
btn.onclick = (function(){
    var myRest = null;
    return function(){
        btn.style.display = "none";
       // 创建餐厅
        if(myRest === null){
            myRest = restaurantSingleton.getInstance({cash: 1000000,
                seats: 1,
                staff: []});
            // 招收服务员及厨师
            var w = Waiter.getInstance('wyq', '6000');
            var k = Cooker.getInstance('zkz', '8000');
            myRest.hire(w);
            myRest.hire(k);

            var j = 0;
            // 顾客循环函数（一个顾客走了另一个进来，不用for..of 是因为里面涉及计时器会有意想不到的结果）
            function customerLoop(){
                var Xman = new Customer(customers[j]);
                j++;
                console.log("顾客看菜单中...");
                p.innerHTML += "<br>顾客看菜单中...";

                new Promise(function(resolve, reject){
                    // 3秒后向后传递所点菜品
                    setTimeout(function(){
                        resolve(w.getOrder(Xman));
                    }, 3000);
                }).then(async function(foods){
                    // 暂停0.5秒让服务员走过来
                    sleep(500);
                    food_list.innerHTML = "待烹饪菜品：";
                    for (let x of foods){
                        food_list.innerHTML += "<li>"+x.name + "</li>";
                    }
                    console.log("厨师烹饪中...");
                    p.innerHTML += "<br>厨师烹饪中...";
                    // 一道一道菜的来，烹饪、上菜、吃菜
                    for (let food of foods){
                        // 等待这道菜完成后再接着下一道菜
                        await new Promise(function(resolve, reject){
                            // 厨师炒菜
                            let aaa = k.work(food);
                            food_list.removeChild(food_list.firstElementChild);
                            if( food == foods[foods.length-1]){
                                food_list.innerHTML = " ";
                            }
                            setTimeout(() => {
                                foodImg[food.id].setAttribute('class', 'food_done');
                                cookTime.innerHTML = "已完成："+food.name;
                                resolve(aaa);
                            }, aaa.time*1000);
                        }).then(function(r){
                            // 服务员上菜，顾客吃菜
                            w.shangcai(r);
                            Xman.eat(r, foods);
                            // 如果上的不是最后一道菜，那么上菜后立马回到厨房等下道菜
                            if (r !== foods[foods.length-1]){
                                setTimeout(() => {
                                    waiterImg.setAttribute("class", "waiter_to_kitchen");
                                }, 1000);
                            }

                        });
                    }
                    return new Promise(function(resolve){
                            resolve(foods);
                    });
                }).then(function(result){
                    cookerStatus.innerHTML = "空闲";
                    cookTime.innerHTML = " ";
                     // 顾客付完钱后离开餐厅 下个顾客进入
                    if ( Xman.name !== customers[customers.length-1]){
                        /* 因为这部分代码是接在厨师抄完最后一道菜后立刻执行，
                        所以等待8秒让顾客充足吃完饭后放进下一位客人*/
                        setTimeout(() => {
                            console.log("nextOne");
                            customerLoop();
                        }, 8000)
                    }
                })
            };
            // 按下按钮1秒后第一位客人进入店铺
            setTimeout(() => {
                customerLoop()
            }, 1000);
        }
    }
})();



/*  简单工厂模式
Staff.factory = (function(){
    Staff.waiter = function(name, wage){
        Staff.call(this, name, wage);
    }
    Staff.waiter.prototype.getOrder= function(customer){
        // 调用顾客点菜的方法
        var food = customer.order();
        p.innerHTML += "<br>服务员正在记录顾客点的菜=>"+food.name;
        console.log("服务员正在记录顾客点的菜=>"+food.name);
        return food;
    }
    Staff.waiter.prototype.log = function(food){
            p.innerHTML += "<br>服务员正在为顾客上菜=>"+food.name;
            console.log("服务员正在为顾客上菜=>"+food.name);
    }
    Staff.waiter.getInstance = (function(){
        var instance = null;
        return function(name, wage){
            if (instance === null){
                instance = new Staff.waiter(name, wage);
            }
            return instance;
        }
    })();
    Staff.cooker = function(name, wage){
        Staff.call(this, name, wage);
        console.log(this.name);
    }
    Staff.cooker.prototype.work = function(food){
        p.innerHTML += "<br>厨师正在烹饪出菜品=>:"+food.name;
        console.log("厨师正在烹饪出菜品=>:"+food.name);
    }
    // 为此构造函数添加一个方法使得无论调用这个方法几次都只能创建一个实例
    Staff.cooker.getInstance = (function(){
        var instance = null;
        return function(name, wage){
            if (instance === null){
                instance = new Staff.cooker(name, wage);
            }
            return instance;
        }
    })();
    return function(kind, name, wage){
        var constr = kind;
        if (typeof Staff[constr] !== "function"){
            throw{
                name:"Error",
                message:constr+"doesn't exist"
            };
        }
        if (Object.getPrototypeOf(Staff[constr].prototype) !== new Staff()){
            Staff[constr].prototype = new Staff();
        }
        return new Staff[constr].getInstance(name, wage);
    }
})();
console.log(111111111111111111)
var aaa = Staff.factory('cooker'," kzk", 5000);
var bbb = Staff.factory('cooker'," kzwds", 50300);
var ccc = Staff.factory('waiter','asd', 8000);
var ddd = Staff.factory('waiter'," wdsdsdyq", 1118000);
console.log(aaa.work());
*/