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
