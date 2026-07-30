const products = [
    {name: "Mango", price: 300, quantity: 3},
    {name: "Papaya", price: 120, quantity: 2},
    {name: "Banana", price: 220, quantity: 1}
];
let price = 0;
let totalPrice = 0;
// console.log(products)

products.forEach(product=> {
    price = product.price* product.quantity;
    totalPrice = totalPrice + price;
})
    console.log(totalPrice)
