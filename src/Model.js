export class Shipment {
  constructor(storeID, sku, quantity) {
    this.storeID = storeID;
    this.sku = sku;
    this.quantity = quantity;
  }
  toString() {
    return this.storeID + " " + this.sku + " " + this.quantity;
  }
}
export class Inventory {
  constructor(storeID, sku, quantity, aisle, shelf) {
    this.storeID = storeID;
    this.sku = sku;
    this.quantity = quantity;
    this.aisle = aisle;
    this.shelf = shelf;
  }
  toString() {
    return (
      this.storeID +
      " " +
      this.sku +
      " " +
      this.quantity +
      " " +
      this.aisle +
      " " +
      this.shelf
    );
  }
}
export class OverStock {
  constructor(storeID, sku, quantity) {
    this.storeID = storeID;
    this.sku = sku;
    this.quantity = quantity;
  }
  toString() {
    return this.storeID + " " + this.sku + " " + this.quantity;
  }
}
export class Missing {
  constructor(sku, name, description, price, maxQ) {
    this.sku = sku;
    this.name = name;
    this.description = description;
    this.price = price;
    this.maxQ = maxQ;
  }
  toString() {
    return (
      this.sku +
      " " +
      this.name +
      " " +
      this.description +
      " " +
      this.price +
      " " +
      this.maxQ
    );
  }
}

export class Model {
  constructor() {
    this.shipments = [];
    this.inventories = [];
    this.overStocks = [];
    this.missings = [];
  }

  copy() {
    let m = new Model();
    m.shipments = this.shipments;
    m.inventories = this.inventories;
    m.overStocks = this.overStocks;
    m.missings = this.missings;
    return m;
  }
}
