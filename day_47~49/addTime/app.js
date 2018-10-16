var restaurant = new Restaurant({
    cash: 500,
    seats: 1,
    staff: []
});
restaurant.draw(); // 画出餐厅 dom

var waitor = new Waitor("Tom", "5000", "01");
var cook = new Cook("Angy", "1000", "02");
restaurant.hire(waitor);

restaurant.staff[0].draw(restaurant.staff[0].constructor);
restaurant.hire(cook);
restaurant.staff[1].draw(restaurant.staff[1].constructor);

console.log("The waitor " + restaurant.staff[0].name + " is serving");
console.log("The cook " + restaurant.staff[1].name + " is serving\n\n");

var customers = [new Customer("Amy"), new Customer("Bob"), new Customer("Cindy")];
for (let i = 0; i < customers.length; i++) {
    customers[i].draw(customers[i].name);
}
var customer = customers[0];

var unitTime = 1000;
var dishes = [{
    name: "BaiCai",
    price: 10,
    cookTime: 2 * unitTime,
}, {
    name: "DongGua",
    price: 8,
    cookTime: 3 * unitTime,
}, {
    name: "NiuRou",
    price: 20,
    cookTime: 5 * unitTime,
}];

function runingProgressGo() {
    customer.setNext(waitor);
    waitor.setNext(cook);
}

function runingProgressBack() {
    cook.setNext(waitor);
    waitor.setNext(customer);
    customer.setNext(null);
}

function openDoor() {
    customer.moveIn();
    var t = setTimeout(function () {
        cusSetStatus(); //1.5s到达座位，设置状态
        customer.seatDown();
    }, 1.5 * unitTime);
}

// 开业
var startButton = document.querySelector("#startBtn");
startButton.addEventListener("click", openDoor);

