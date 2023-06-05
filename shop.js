// 1. Singleton
class ShoppingCart {
  constructor() {
    if (!ShoppingCart.instance) {
      this.items = [];
      ShoppingCart.instance = this;
    }
    return ShoppingCart.instance;
  }

  addItem(item) {
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }
}

// 2. Prototype
class Computer {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  clone() {
    return new Computer(this.name, this.price);
  }
}

// 3. Adapter
class OldPaymentSystem {
  process(amount) {
    return `Processing payment with old system: $${amount}`;
  }
}

class NewPaymentSystem {
  processPayment(amount) {
    return `Processing payment with new system: $${amount}`;
  }
}

class PaymentAdapter {
  constructor(paymentSystem) {
    this.paymentSystem = paymentSystem;
  }

  pay(amount) {
    return this.paymentSystem.processPayment(amount);
  }
}

// 4. Bridge
class ComputerAbstraction {
  constructor(implementation) {
    this.implementation = implementation;
  }

  display() {
    return this.implementation.displayDetails();
  }
}

class ComputerImplementation {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  displayDetails() {
    return `Product: ${this.name}, Price: $${this.price}`;
  }
}

// 5. Memento
class ShoppingCartMemento {
  constructor(state) {
    this.state = JSON.parse(JSON.stringify(state));
  }

  getState() {
    return this.state;
  }
}

class ShoppingCartCaretaker {
  constructor() {
    this.savedStates = [];
  }

  saveState(state) {
    this.savedStates.push(new ShoppingCartMemento(state));
  }

  restoreState(index) {
    if (this.savedStates[index]) {
      return this.savedStates[index].getState();
    }
    return [];
  }
}

// 6. Observer
class User {
  update(message) {
    console.log(`User notified: ${message}`);
  }
}

class Shop {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notifyObservers(message) {
    for (const observer of this.observers) {
      observer.update(message);
    }
  }

  addToCart(item) {
    const shoppingCart = new ShoppingCart();
    shoppingCart.addItem(item);
    this.notifyObservers("Item added to cart: " + item.name);
  }
}

const computer1 = new Computer("Computer 1", 1000);
const computer2 = new Computer("Computer 2", 1500);
const computer3 = new Computer("Computer 3", 2000);

const computers = [computer1, computer2, computer3];

const shop = new Shop();
const user = new User();
shop.addObserver(user);

const productsDiv = document.getElementById("products");
computers.forEach((computer) => {
  const computerDiv = document.createElement("div");
  const computerAbstraction = new ComputerAbstraction(
    new ComputerImplementation(computer.name, computer.price)
  );
  computerDiv.innerHTML = computerAbstraction.display();

  const addToCartButton = document.createElement("button");
  addToCartButton.innerText = "Add to cart";
  addToCartButton.addEventListener("click", () => {
    shop.addToCart(computer);
    renderCart();
  });
  computerDiv.appendChild(addToCartButton);
  productsDiv.appendChild(computerDiv);
});

const cartDiv = document.getElementById("cart");
function renderCart() {
  cartDiv.innerHTML = "";
  const shoppingCart = new ShoppingCart();
  const items = shoppingCart.getItems();
  items.forEach((item) => {
    const cartItem = document.createElement("div");
    const cartItemAbstraction = new ComputerAbstraction(
      new ComputerImplementation(item.name, item.price)
    );
    cartItem.innerHTML = cartItemAbstraction.display();
    cartDiv.appendChild(cartItem);
  });
}

const cartCaretaker = new ShoppingCartCaretaker();
document.getElementById("saveCartState").addEventListener("click", () => {
  const shoppingCart = new ShoppingCart();
  cartCaretaker.saveState(shoppingCart.getItems());
  console.log("Cart state saved");
});

document.getElementById("restoreCartState").addEventListener("click", () => {
  const lastState = cartCaretaker.savedStates.length - 1;
  const restoredState = cartCaretaker.restoreState(lastState);
  const shoppingCart = new ShoppingCart();
  shoppingCart.items = restoredState;
  renderCart();
  console.log("Cart state restored");
});

// Testing the Adapter pattern
const oldPaymentSystem = new OldPaymentSystem();
const newPaymentSystem = new NewPaymentSystem();
const paymentAdapter = new PaymentAdapter(newPaymentSystem);

document.getElementById("testAdapter").addEventListener("click", () => {
  const outputDiv = document.getElementById("adapterTestOutput");
  outputDiv.innerHTML = `Old System: ${oldPaymentSystem.process(100)}<br/>Adapter: ${paymentAdapter.pay(100)}`;
});
