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
    addManager(manager1){
        if(!this.employee.includes(manager1)){
            this.employee.push(manager1);
            return `${this.employee[0].name} is now the manager for ${this.name}`
        }

    }
    addEmployee(worker1){
        if(!this.employee.includes(worker1)){
            this.employee.push(worker1);
            return `Manager: ${this.employee[0].name} Workers: ${this.employee[1].name}, ${this.employee[1].position}`
        }
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
      this.branchWorker = [];
    }
    addWorker(name){
        if(!this.branchWorker.includes(name)){
            this.branchWorker.push(name);
            return `${name} is added.`
        }
        
  }
  removeWorker(name){
    if(this.branchWorker.includes(name)){
        this.branchWorker.pop(name);
        return `${name} is removed. Current workers: ${this.name}`
    }

  }
}
  
  class Menu {
    constructor(type, name, price, isWarm) {
      this.type = type;
      this.name = name;
      this.price = price;
      this.isWarm = isWarm;
    }
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
  

console.log(manager1.addWorker("Poli")); // Sandy is added
console.log(manager1.branchWorker) // [ Worker { name: 'Sandy', position: 'Cashier' } ]
console.log(manager1.removeWorker("Poli")); // Sandy is now removed. current workers: Philip
console.log(cafe1.addManager(manager1)); // Tina is now the manager for E08 Kreuzberg
console.log(cafe1.addEmployee(worker1)); // manager: Tina, workers: Sandy(Cashier), Philip(Barista)
console.log(cafe1.addEmployee(worker3));
