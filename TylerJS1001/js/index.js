// Question 2
// create html base
var body = document.querySelector('body');
var foods = ['pizza', 'burger', 'chips', 'donuts', 'natto'];
var cars = ['Honda', 'Toyota', 'Ford', 'BMW', 'Audi'];
function Q2_Display_Array(foods, cars) {
    // create ul for foods
    var ulFoods = document.createElement('ul');
    for (var i = 0; i < foods.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = foods[i];
        ulFoods.appendChild(li);
    }
    var ulCars = document.createElement('ul');
    // create ul for cars
    for (var i = 0; i < cars.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = cars[i];
        ulCars.appendChild(li);
    }
    // append ul to body
    body.appendChild(ulFoods);
    body.appendChild(ulCars);
}
// execute function
Q2_Display_Array(foods, cars);

// Question 3
function Q3_Add_Item(Position, Item, Input_Array) {
    // add item at position
    var output = [];
    for (var i = 0; i < Input_Array.length; i++) {
        // push item if correct position
        if (i == Position) {
            output.push(Item)
        }
        output.push(Input_Array[i]);
    }
    return output;
}
// execute function
var foods = ['pizza', 'burger', 'chips', 'donuts', 'natto'];
newfoods = Q3_Add_Item(2, 'onigiri', foods);
console.log(`newfoods: ${newfoods}`);

// Question 4
function Q4_Array_Cleaner(Input_Array) {
    // remove duplicate items
    var output = [];
    // create a map to store items for condition check
    var map = new Map;
    for (var i = 0; i < Input_Array.length; i++) {
        // check if item is in output
        if (Input_Array[i] in map) {
            null
        } else {
            map[Input_Array[i]] = null;
            output[i] = Input_Array[i];
        }
    }
    return output;
}
// execute function
var cars = ['Honda', 'Toyota', 'Ford', 'BMW', 'Audi', 'Honda', 'Toyota', 'Ford', 'BMW', 'Audi'];
newcars = Q4_Array_Cleaner(cars);
console.log(`newcars: ${newcars}`);

// Question 5
const Sold_item = function (ItemCode, Name, qyn, price) {
    this.ItemCode = ItemCode;
    this.Name = Name;
    this.qyn = qyn;
    this.price = price;
    // calculate total price
    this.total = function () {
        return this.qyn * this.price;
    }
    // display item details
    this.display = function () {
        return this.ItemCode + " " + this.Name + " " + this.qyn + " " + this.price + " " + this.total();
    }
}
// execute function
var item = new Sold_item(1, 'apple', 1, 2.5);
console.log(`item: ${item.display()}`);

// Question 6
const Sold_items = new Map();
var item1 = new Sold_item(1, 'apple', 1, 2.5);
var item2 = new Sold_item(2, 'orange', 2, 1.5);
var item3 = new Sold_item(3, 'banana', 4, 2.5);
Sold_items.set(item1.ItemCode, item1);
Sold_items.set(item2.ItemCode, item2);
Sold_items.set(item3.ItemCode, item3);
// add item
function addToMap(MapList, item) {
    MapList.set(item.ItemCode, item);
}
// search item
function searchItem(MapList, ItemCode) {
    return MapList.get(ItemCode);
}
// define item
function deleteItem(MapList, ItemCode) {
    MapList.delete(ItemCode);
}
// execute function
addToMap(Sold_items, item1);
addToMap(Sold_items, item2);
addToMap(Sold_items, item3);
// display map
function displayMap(MapList) {
    for (var [key, value] of MapList) {
        console.log(`key: ${key}, value: ${value.display()}`);
    }
}
// execute function
displayMap(Sold_items);
console.log("add items");
searchItem(Sold_items, 1);
searchItem(Sold_items, 2);
searchItem(Sold_items, 3);
console.log("delete item 1");
deleteItem(Sold_items, 1);
console.log("display map");
displayMap(Sold_items);

// Question 7
function Cal_TotalSale(MapList) {
    var total = 0;
    MapList.forEach(function (value, key) {
        total += value.total();
    });
    return total;
}
// execute function
console.log(`total sale: ${Cal_TotalSale(Sold_items)}`);