# Lucrare de an TMPS
În cadrul acestei lucrari, am utilizat mai multe patternuri de design pentru a crea soluții eficiente și flexibile pentru diverse probleme de programare. Printre acestea se numără patternurile Singleton, Prototype, Adapter, Bridge, Memento și Observer.

## Cuprins
- [Singleton](#singleton)
- [Prototype](#prototype)
- [Adapter](#adapter)
- [Bridge](#bridge)
- [Momento](#momento)
- [Observer](#observer)
## Singleton
Singleton este un design pattern care se asigură că o clasă are doar o singură instanță și oferă un punct de acces global la acea instanță. În acest cod, clasa ShoppingCart este implementată ca un Singleton. Constructorul clasei verifică dacă există deja o instanță și, în caz afirmativ, returnează instanța existentă în loc să creeze una nouă. Acest lucru se face pentru a ne asigura că există un singur coș de cumpărături în aplicație.
```
class ShoppingCart {
  constructor() {
    if (ShoppingCart.instance) {
      return ShoppingCart.instance;
    }
    this.items = [];
    ShoppingCart.instance = this;
  }
  // ... restul metodelor ...
}
```
## Prototype:
Pattern-ul Prototype permite crearea de obiecte noi prin clonarea unui obiect prototip existent. În acest cod, clasa Computer are o metodă clone() care creează un nou obiect Computer cu aceleași proprietăți ca instanța curentă.
```
class Computer {
  // ... constructor și alte metode ...
  clone() {
    return new Computer(this.name, this.price);
  }
}
```
## Adapter:
Adapter este un design pattern care convertește interfața unei clase într-o altă interfață pe care o așteaptă clientul. În acest cod, clasele OldPaymentSystem și NewPaymentSystem au metode diferite pentru procesarea plăților. Clasa PaymentAdapter adaptează interfața NewPaymentSystem la interfața OldPaymentSystem prin implementarea unei metode pay() care apelează metoda processPayment() a noului sistem de plată.
```
class PaymentAdapter {
  constructor(paymentSystem) {
    this.paymentSystem = paymentSystem;
  }

  pay(amount) {
    return this.paymentSystem.processPayment(amount);
  }
}
```
## Bridge:
Bridge este un design pattern care separă o abstracție de implementarea sa, astfel încât cele două pot fi modificate independent. În acest cod, clasa ComputerAbstraction și ComputerImplementation formează un Bridge. ComputerAbstraction este o clasă care oferă o metodă display() ce apelează metoda displayDetails() a unei instanțe a clasei ComputerImplementation.
```
class ComputerAbstraction {
  constructor(implementation) {
    this.implementation = implementation;
  }

  display() {
    return this.implementation.displayDetails();
  }
}
```
## Memento:
Memento este un design pattern care oferă posibilitatea de a salva și restaura starea unui obiect fără a dezvălui detaliile interne ale implementării acestuia. În acest cod, clasa ShoppingCartMemento salvează starea unui coș de cumpărături, iar clasa ShoppingCartCaretaker gestionează aceste stări salvate.
```
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
```
## Observer:
Observer este un design pattern care definește o relație între obiecte de tip "one-to-many", astfel încât, atunci când un obiect se modifică, toate obiectele dependente sunt notificate și actualizate automat. În acest cod, clasa User este un Observer, iar clasa Shop este un Subject care gestionează observatorii și îi notifică în legătură cu evenimente specifice.
```
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
```