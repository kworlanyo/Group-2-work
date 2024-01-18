class Worker {
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }
}

class Manager extends Worker {
    constructor(name, branchID) {
        super (name,"manager");
        this.branchID = branchID;
        this.branchWorker = [];
    }
}

const manager1 = new Manager("Tina", 1);
console.log(manager1);