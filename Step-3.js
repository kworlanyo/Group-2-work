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
  