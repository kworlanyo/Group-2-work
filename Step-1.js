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