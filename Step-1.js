class Cafe {
  constructor(branchId, name, city, sellsFood = false) {
    this.branchId = branchId;
    this.name = name;
    this.city = city;
    this.sellsFood = sellsFood;
    this.menu = [];
    this.employee = [];
    this.order = [];
  }
}

// Shinhee's example:
const cafe1 = new Cafe(1, "E08 Kreuzberg", "Berlin", false);
console.log(cafe1);

// Output is indeed:
// Cafe {
//     branchId: 1,
//     name: 'E08 Kreuzberg',
//     city: 'Berlin',
//     sellsFood: false,
//     menu: [],
//     employee: [],
//     order: []
//   }

class Menu {
  constructor(type, name, price, isWarm) {
    this.type = type;
    this.name = name;
    this.price = price;
    this.isWarm = isWarm;
  }
}

const food1 = new Menu("food", "Hot Sandwich", 12.5, true);
console.log(food1);


class Worker {
  constructor(name, position) {
    this.name = name;
    this.position = position;
    
  }
}

const worker1 = new Worker("Worlanyo", "barista");
const worker2 = new Worker("Ognjen", "barista");
const worker3 = new Worker("Lucas", "cashier");
const worker4 = new Worker("Tomislav", "cashier");

console.log(worker1);
console.log(worker2);
console.log(worker3);
console.log(worker4);