
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
  
    addManager(manager) {
      this.employee.push(manager);
      return `${manager.name} is now the manager for ${this.name}`;
    }
  
    addEmployee() {
      this.employee[0].branchWorkers.map((person) => this.employee.push(person));
      let sliceWorkers = this.employee.slice(1);
      let workers = sliceWorkers.map((obj) => `${obj.name}(${obj.position})`);
      return `manager: ${this.employee[0].name}, workers: ${workers.join(", ")}`;
    }
  
    addMenu(menu) {
      if (this.sellsFood === false && menu.type === "food") {
        return `${this.name} doesn't sell food.`;
      } else {
        this.menu.push(menu);
        return `${menu.name} has been added.`;
      }
    }
  
    removeMenu(menuToDelete) {
      this.menu = this.menu.filter((eachMenu) => eachMenu !== menuToDelete);
      let menuLeft = this.menu.map((obj) => obj.name);
      return `${
        menuToDelete.name
      } is removed. Current menu available: ${menuLeft.join(", ")}`;
  
      //     const manager = this.employee[0];
      //     const workers = manager.branchWorker;
  
      //     this.employee = [manager, ...workers];
      //     return `manager: ${manager.name}, workers: ${workers.map(worker => `${worker.name}(${worker.position})`).join(', ')}`;
      //   }
  
      //   addMenu(menu) {
      //     if (!this.sellsFood && menu.type === 'food') {
      //       return `${this.name} doesn't sell food.`;
      //     }
      //     this.menu.push(menu);
      //     return `${menu.name} added`;
      //   }
  
      //   removeMenu(menu) {
      //     const removedIndex = this.menu.findIndex(m => m.name === menu.name);
      //     if (removedIndex !== -1) {
      //       const removedMenu = this.menu.splice(removedIndex, 1)[0];
      //       return `${removedMenu.name} is removed. current menu available: ${this.menu.map(m => m.name).join(', ') || 'None'}`;
      //       // Same issue as in the removeWorker method below... without the extension " || 'None' " it would return "undefined" (or nothing at all) if there is no menu left in the array...
      //     } else {
      //       return `${menu.name} is not found in the menu array`;
      //     }
    }
  
    getOrder(order) {
      this.order.push(order);
      const sum = this.calculateOrderSum(order);
      return `${sum.toFixed(1)} euros, please`;
    }
    // * OR:
    // getOrder(order) {
    //     this.order.push(order);
    //     const sum = this.calculateOrderSum(order);
    //     const roundedSum = Math.round(sum * 10) / 10;
    //     return `${roundedSum} euros, please`;
    //   }
    // * Maybe easier to understand, but not as precise as the toFixed() method...
  
    processOrder() {
      if (this.order.length === 0) {
        return "no order to process";
      }
  
      const processedOrder = this.order.shift();
      const message = `${processedOrder.quantity} ${processedOrder.name} ready.`;
  
      if (this.isOrderWarm(processedOrder)) {
        return `${message} be careful, it's hot.`;
      } else {
        return message;
      }
    }
  
    // calculateOrderSum(order) {
    //   const menuPrice = this.menu.find(item => item.name === order.name).price;
    //   return order.quantity * menuPrice;
    // }
    // ! No! "Cannot read properties of undefined (reading 'price')"... So:
  
    calculateOrderSum(order) {
      const menuItem = this.menu.find((item) => item.name === order.name);
  
      if (menuItem) {
        return order.quantity * menuItem.price;
      } else {
        console.error(`Menu item '${order.name}' not found.`);
        return 0;
      }
    }
  
    getMultiOrder(multiOrder) {
      multiOrder.orderArr.forEach((order) => {
        this.order.push(order);
      });
  
      const sum = multiOrder.orderArr.reduce(
        (total, order) => total + this.calculateOrderSum(order),
        0
      );
      return `${sum.toFixed(1)} euros, please`;
    }
  
    processMultiOrder() {
      if (this.order.length === 0) {
        return "no order to process";
        // I guess...
      }
  
      const messages = [];
      this.order.forEach(order => {
        const message = `${order.quantity} ${order.name}`;
        if (this.isOrderWarm(order)) {
          // messages.push(`${message} - hot`);
          // messages.push(`hot ${message}`);
          // I didn't know how to add the " - hot" part to the message if the order is warm, so it doesn't look too weird (grammatically).
          // I tried to do it in the calculateOrderSum method, but it didn't work... So I added it here...
          // * Maybe this way:
          messages.push(`${order.quantity} hot ${order.name}`);
        } else {
          messages.push(message);
        }
      });
  
      this.order = [];
  
      return `${messages.join(", ")} ready, thank you!`;
    }
  
    // isOrderWarm(order) {
    //   const menuIsWarm = this.menu.find(item => item.name === order.name).isWarm;
    //   return menuIsWarm;
    // }
    // ! Same issue as in the calculateOrderSum method above... So:
  
    isOrderWarm(order) {
      const menuItem = this.menu.find((item) => item.name === order.name);
  
      if (menuItem) {
        return menuItem.isWarm;
      } else {
        console.error(`Menu item '${order.name}' not found.`);
        return false;
      }
    }
  }
  
  // -------------------------------------------------------------------------
  
  const menu1 = new Menu("drink", "Americano", 4.5, true);
  const menu2 = new Menu("drink", "Cappuccino", 4.5, true);
  // const menu3 = new Menu("drink", "Latte", 5, true);
  // const menu4 = new Menu("drink", "Espresso", 3.5, false);
  
  const cafe1 = new Cafe(1, "E08 Kreuzberg", "Berlin", false);
  const cafe2 = new Cafe(2, "E08 Altona", "Hamburg", true);
  const cafe3 = new Cafe(3, "E08 Mitte", "Leipzig", true);
  
  cafe1.menu.push(menu1);
  cafe1.menu.push(menu1, menu2);
  // cafe2.menu.push(menu3);
  // cafe3.menu.push(menu4);
  
  // ? --------------------------------------
  
  const order1 = new Order("Americano", 3);
  // const order2 = new Order("Cream Salad", 2);
  
  console.log(order1);
  // console.log(order2);
  
  console.log(cafe1.getOrder(order1)); // 12 euros, please
  console.log(cafe1.processOrder()); // 3 Americano ready. be careful, it's hot.
  
  const order2 = new MultiOrder(
    { name: "Americano", quantity: 3 },
    { name: "Cappuccino", quantity: 2 }
  );
  
  console.log(cafe1.getMultiOrder(order2));
  console.log(cafe1.processMultiOrder());
  
  // ? --------------------------------------
 
class Menu {
    constructor(type, name, price, isWarm) {
      this.type = type;
      this.name = name;
      this.price = price;
      this.isWarm = isWarm;
    }
  }
  
  class Order {
    constructor(name, quantity) {
      this.name = name;
      this.quantity = quantity;
    }
  }
  
  class MultiOrder {
    constructor(...orders) {
      this.orderArr = orders;
    }
  }


class Worker {
  constructor(name, position) {
    this.name = name;
    this.position = position;
  }
}

class Manager extends Worker {
  constructor(name, branchID) {
    super(name, "manager");
    this.branchID = branchID;
    this.branchWorkers = [];
  }

  addWorker(worker) {
    this.branchWorkers.push(worker);
    return `${worker.name} is added`;
  }

  removeWorker(worker) {
    this.branchWorkers = this.branchWorkers.filter((person) => person.name !== worker);
    let currentWorkers = this.branchWorkers.map((person) => person.name);
    return `${worker} is removed. Current workers: ${currentWorkers.join(", ")}`;
  }

  //   removeWorker(name) {
  //     const removedWorkerIndex = this.branchWorker.findIndex(worker => worker.name === name);

  //     if (removedWorkerIndex !== -1) {

  //       const removedWorker = this.branchWorker.splice(removedWorkerIndex, 1)[0];
  //       return `${removedWorker.name} is now removed. current workers: ${this.branchWorker.map(worker => worker.name).join(", ") || 'None'}`;
  //       // Wow... that took me some time... without tne extension " || 'None' " it would return "undefined" if there is no worker left in the array...
  //     } else {
  //       return `${name} is not found in the branchWorkers array`;
  //     }
}

const cafe1 = new Cafe(1, "E08 Kreuzberg", "Berlin", false);
const cafe2 = new Cafe(2, "E08 Altona", "Hamburg", true);
const cafe3 = new Cafe(3, "E08 Mitte", "Leipzig", true);

const worker1 = new Worker("Worlanyo", "barista");
const worker2 = new Worker("Ognjen", "barista");
const worker3 = new Worker("Lucas", "cashier");
const worker4 = new Worker("Tomislav", "cashier");
const worker5 = new Worker("Shinhee", "barista");
const worker6 = new Worker("Jamie", "cashier");

const manager1 = new Manager("Tina", 1);
const manager2 = new Manager("Poli", 2);
const manager3 = new Manager("Zhanna", 3);

const menu1 = new Menu("food", "Hot Sandwich", 12.5, true);
const menu2 = new Menu("food", "Cream Salad", 10.5, false);
const menu3 = new Menu("food", "Potato Chips", 8.5, true);
const menu4 = new Menu("food", "Ice Cream", 3.5, false);
const menu5 = new Menu("food", "Okonomiyaki", 13.5, true);
const menu6 = new Menu("food", "Ham & Eggs", 12.5, true);

// console.log(manager1.addWorker(worker1));
// console.log(manager1.addWorker(worker3));
// console.log(manager2.addWorker(worker2));
// console.log(manager2.addWorker(worker4));
// console.log(manager3.addWorker(worker5));
// console.log(manager3.addWorker(worker6));
// console.log(manager1.branchWorkers);
// console.log(manager2.branchWorkers);
// console.log(manager3.branchWorkers);
// // console.log(manager1.removeWorker("Worlanyo"));
// console.log(cafe1.addManager(manager1));
// console.log(cafe1.employee);
// console.log(cafe1.addEmployee());

// console.log(cafe1.addMenu(menu1));
// console.log(cafe1.addMenu(menu4));
// console.log(cafe2.addMenu(menu3));
// console.log(cafe2.addMenu(menu2));
// console.log(cafe3.addMenu(menu5));
// console.log(cafe3.addMenu(menu6));

// console.log(cafe1.removeMenu(menu1));

// console.log(cafe1);

// * Task 1.1
console.log(manager1.addWorker(worker1));
console.log(manager1.branchWorker);

console.log(manager1.removeWorker("Worlanyo"));

// * Task 1.2
manager1.addWorker(worker2);
manager1.addWorker(worker3);
manager2.addWorker(worker4);
manager2.addWorker(worker5);
manager3.addWorker(worker6);

// * Task 1.3
console.log(manager1.removeWorker("Worlanyo"));
manager1.addWorker(worker1);

// * Task 2.1
console.log(cafe1.addManager(manager1));
console.log(cafe1.addEmployee());

console.log(cafe1.addMenu(menu1));
const drink1 = new Menu("drink", "Americano", 5.5, true);
console.log(cafe1.addMenu(drink1));

console.log(cafe1.removeMenu(drink1));
cafe1.addMenu(drink1);

// * Task 2.2
console.log(cafe2.addManager(manager2));
console.log(cafe2.addEmployee());

const food2 = new Menu("food", "Caesar Salad", 11.5, false);
const drink2 = new Menu("drink", "Latte", 4.5, true);

console.log(cafe2.addMenu(food2));
console.log(cafe2.addMenu(drink2));

console.log(cafe3.addManager(manager3));
console.log(cafe3.addEmployee());

const food3 = new Menu("food", "Sushi Roll", 15.5, false);
const drink3 = new Menu("drink", "Espresso", 3.5, true);

console.log(cafe3.addMenu(food3));
console.log(cafe3.addMenu(drink3));

// * Task 2.3
console.log(cafe1.removeMenu(drink1));
cafe1.addMenu(drink1);

// * cafe1
console.log(cafe1);

const order1 = new Order(drink1, 3);
console.log(order1); // Order { quantity: 3, name: 'Americano' }

console.log(cafe1.getOrder(order1)); // 12 euros, please
console.log(cafe1.processOrder()); // 3 Americano ready. be careful, it's hot.

// * Task 3.2
    console.log(order1);
    console.log(order2);
    
    // * Task 3.3
    console.log(getOrder("Americano"));

// class Order {
//     constructor(name, quantity) {
//         this.name = name;
//         this.quantity = quantity;
//     }
// }

// const order1 = new Order("Americano", 3);
// console.log(order1) // Order { quantity: 3, name: 'Americano' }

// class Cafe {
//     constructor() {
//         this.orderArray = [];
//     }

// }
