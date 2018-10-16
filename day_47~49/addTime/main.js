
// 餐厅
function Restaurant(resObj) {
    var resObj = resObj || {};
    var cash = resObj.cash || "100000";
    var seats = resObj.seats || "1";
    var staff = resObj.staff || [];
    this.cash = cash;
    this.seats = seats;
    this.staff = staff;
}

Restaurant.prototype = {
    draw: function () {
        resDraw();
    },
    hire: function (staffObj) {
        staffObj.id = this.staff.length + 1;
        this.staff.push(staffObj);
    },
    fire: function (staffObj) {
        var newStaff = [];
        for (let i = 0; i < this.staff.length; i++) {
            if (this.staff[i] !== staffObj) {
                newStaff.push(this.staff[i]);
            }
        }
        this.staff = newStaff;
    }
}

// 职员
function Staff(name, salary, id) {
    var name = name || "Leo";
    var salary = salary || 10000;
    var id = 1;
    this.name = name;
    this.salary = salary;
    this.id = id;
}

// 服务员
function Waitor(name, salary, id) {
    Staff.call(this, name, salary, id);
    this.next = null;
    this.ysc = 0;//已经上的菜
}
Waitor.prototype = {
    constructor: Waitor,
    draw: function (constructor) {
        staffDraw(constructor);
    },
    setNext: function (_handler) {
        this.next = _handler;
    },
    handleRequest: function (dishes, over) {
        if (this.next instanceof Cook) {
            // moveHeriR
            // waitorMoveHeriR();//走到餐桌
            this.recordDishes(arguments[0]);//记录菜品
        } else if (this.next instanceof Customer) {
            // moveDown
            waitorMoveDown();
            var _waitor = this;
            var t = setTimeout(function () {
                _waitor.offerDishes(dishes, over);; //移动需要0.5s
            }, 0.5 * unitTime);
        }
    },
    recordDishes: function (dishes) {
        console.log("waitor records dishes: " + dishes.length);
        // moveUp
        waitorMoveUp();//走回厨房
        var _waitor = this;
        var t = setTimeout(function () {
            _waitor.next.handleRequest(dishes); //移动需要0.5s
        }, 0.5 * unitTime);

    },
    offerDishes: function (dishes, over) {
        console.log("waitor offers dishes " + dishes.name);
        this.ysc++;
        // 判断是否要回去,判断是否还有菜没上
        if (this.next.dishes.length - this.ysc > 0) {
            // 回去
            waitorMoveUp();
        } else {
            waitorMoveHeriL();
        }
        this.next.handleRequest(dishes, over);
    }
}

// 厨师
function Cook(name, salary, id) {
    Staff.call(this, name, salary, id);
    this.next = null;
}
Cook.prototype = {
    constructor: Cook,
    draw: function (constructor) {
        staffDraw(constructor);
    },
    setNext: function (_handler) {
        this.next = _handler;
    },
    handleRequest: function (dishes) {
        runingProgressBack();
        this.dishes = dishes; //记录客人的点菜，作为之后的参数
        this.getDishes(dishes);
    },
    getDishes: function (dishes) {
        console.log("cook gets dishes: " + dishes.length);
        // 创建菜单
        this.startCook(dishes);
    },
    startCook: function (dishes) {
        console.log("cook start to cook " + dishes[0].name + " needs " + (dishes[0].cookTime / 1000) + "s");
        this.finishCook(dishes);
    },
    finishCook: function (dishes) {
        // console.log("cook start to cook " + unFinishDishes[0].name + " needs " + (dishes[0].cookTime / 1000) + "s");
        var _cook = this;
        var unFinishDishes = dishes;
        var time = dishes[0].cookTime;
        var t = setTimeout(function () {
            var cookedDishes = dishes[0];
            unFinishDishes.shift();
            console.log("cook finish cooking " + cookedDishes.name);
            // 改变菜单
            if (unFinishDishes.length > 0) {
                _cook.startCook(unFinishDishes);
                var over = "";
                _cook.next.handleRequest(cookedDishes, over);
            } else {
                var over = "over";
                _cook.next.handleRequest(cookedDishes, over);
            }
        }, time);
    }
}

// 顾客 构造器+原型/函数表达式+原型
function Customer(name) {
    this.name = name;
    this.next = null;
}
Customer.prototype = {
    draw: function (name) {
        cusDraw(name);
    },
    moveIn: function () {
        cusMoveIn();
    },
    moveOut: function () {
        cusMoveOut();
    },
    setNext: function (_handler) {
        this.next = _handler;
    },
    handleRequest: function (dishes, over) {
        this.getDishes(dishes, over);
    },
    seatDown: function () {
        runingProgressGo();
        console.log("customer " + this.name + " seat down");
        console.log("customer " + this.name + " 点菜中...");
        this.next.ysc = 0;
        waitorMoveHeriR();
        var dishes = this.orderDishes();
        this.dishes = [];
        for (let i = 0; i < dishes.length; i++) {
            this.dishes.push(dishes[i]); //记录点菜信息
        }
        this.weiChiCaiNum = this.dishes.length;
        this.tableDishes = []; //记录桌上已经有的菜
        this.isEating = "no"; // 记录是否在吃饭
        var _customer = this;
        function nextPro(dishes) { //叫服务员记录菜单
            cusChangeStatus(); //花3秒点菜，之后，等待上菜
            cusCreateDishes(dishes);
            _customer.next.handleRequest(dishes);
        }
        var t = setTimeout(function () {
            nextPro(dishes);
        }, 3 * unitTime);
    },
    orderDishes: function () {
        var num = Math.floor(Math.random() * dishes.length) + 1;//[0,1)*3 = [0,3) Math.floor([0,3)) = [0,2]
        var newDishes = [];
        for (let i = 0; i < num; i++) {
            var th = Math.floor(Math.random() * dishes.length);
            if (newDishes.indexOf(dishes[th]) == -1) { //一个人不点相同的菜
                newDishes.push(dishes[th]);
            } else {
                num = num + 1;
            }
        }
        console.log("customer " + this.name + " order dishes: ");
        for (let i = 0; i < newDishes.length; i++) {
            console.log("  " + newDishes[i].name);
        }
        return newDishes;
    },
    getDishes: function (dishes, over) {
        this.tableDishes.push(dishes);
        cusDishesListChange(dishes, true);
        if (arguments[1] == "over") {
            console.log("所有菜已经上齐了");
        }
        if (this.isEating == "no") {
            this.eat(this.tableDishes[0]);
        }
    },
    eat: function (dishes) {
        this.isEating = "yes";
        cusChangeStatus();//改变状态
        console.log("customer " + this.name + " start eat dish " + dishes.name);
        var _customer = this;
        var t = setTimeout(function () {
            console.log("customer " + _customer.name + " finish eating " + dishes.name);
            _customer.weiChiCaiNum--;
            var eatenDishes = _customer.tableDishes.shift();
            cusDishesListChange(eatenDishes, false);
            if (_customer.tableDishes.length > 0) { // 桌上还有其他菜
                var nextDishes = _customer.tableDishes[0];
                _customer.eat(nextDishes);
            } else { // 桌上没有其他菜了
                cusChangeStatus(_customer.weiChiCaiNum); //等下一道菜或者结账
                if (_customer.weiChiCaiNum > 0) { // 还有未上的菜
                    _customer.isEating = "no";
                    console.log("customer " + _customer.name + " is waiting for next dishes");
                } else { // 没有未上的菜了
                    _customer.checkout();
                }
            }
        }, 1 * unitTime);

    },
    checkout: function () {
        console.log("customer " + this.name + " checkout \n ");
        cusDeleteDishes();//删除列表
        var tt = setTimeout(function () {
            customer.moveOut();
            customers.shift();
            if (customers.length > 0) {
                nextCustomer();
                var t = setTimeout(function () {
                    cusSetStatus(); //1.5s到达座位，设置状态
                    customer.seatDown();
                }, 1.5 * unitTime);
            } else {
                console.log("no customers there.");
            }
        }, 0.5 * unitTime);
    }
}

function nextCustomer() {
    customer = customers[0];
    customer.moveIn();
}

