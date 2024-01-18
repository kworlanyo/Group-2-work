class Order {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

const order1 = new Order("Americano", 3);
console.log(order1) // Order { quantity: 3, name: 'Americano' }

class Cafe {
    constructor() {
        this.orderArray = [];
    }

}