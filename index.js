// const { jsx } = require("react/jsx-runtime");

// card 
const loadTreeDetails = () => {
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            displayTreeDetails(json.plants)
        })
}
loadTreeDetails()


// Display All Tree Details
const displayTreeDetails = (values) => {
    // console.log(values)
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    //     {
    //     "id": 1,
    //     "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
    //     "name": "Mango Tree",
    //     "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
    //     "category": "Fruit Tree",
    //     "price": 500
    // }

    for (let value of values) {

        const card = document.createElement("div");
        card.innerHTML = `
              <div class="shadow-sm rounded-xl">
                    <div class=" border-blue-400 p-5 bg-white rounded-xl space-y-3">
                        <img class="rounded-xl w-full h-[186px] object-cover" src="${value.image}" alt="">
                        <h1 class="font-semibold text-xl" onclick="loadWord(${value.id})">${value.name}</h1>
                        <p>${value.description.slice(0, 100)}....</p>
                        <div class="flex justify-between items-center">
                            <button class="btn h-7 rounded-lg bg-green-200 text-green-700">${value.category}</button>
                            <h2 class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${value.price}</h2>
                        </div>
                        <button onclick="loadAddCartBtn(${value.id})" id="btn-${value.id}" class="btn w-full rounded-xl bg-[#15803D] text-white">Add to Cart</button>
                    </div>
                </div>
        `
        cardContainer.append(card)
    }
}

// loadWord
const loadWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => displayWord(json.plants))
}
const displayWord = (word) => {
    console.log(word)

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    const wordDiv = document.createElement("div");
    wordDiv.innerHTML = `
    
           <div class="shadow-sm rounded-xl">
                    <div class=" border-blue-400 p-5 bg-white rounded-xl space-y-3">
                        <img class="rounded-xl w-full h-[250px] object-cover" src="${word.image}" alt="">
                        <h1 class="font-semibold text-xl" onclick="loadWord(${word.id})">${word.name}</h1>
                        <p>${word.description}</p>
                    </div>
                </div>

    `
    wordContainer.append(wordDiv)
    document.getElementById("my_modal_5").showModal()
}

// const addCartBtn = document.getElementById("btn-${value.id}")
// console.log(addCartBtn)

// category container
const loadCategory = (id) => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            displayCategory(json.categories)
        })
}
loadCategory()

// {
//     "id": 1,
//     "category_name": "Fruit Tree",
//     "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// }



// Display All Category 
displayCategory = (categories) => {
    // console.log(categories)

    const categoryContainer = document.getElementById("category-container");
    categoryContainer.innerHTML = "";

    for (let category of categories) {
        // console.log(category)

        const btnCategory = document.createElement("div");

        btnCategory.innerHTML = `
        <button id="category-btn-${category.id}" onclick="loadCategoryData(${category.id})" class="category-btn btn w-full justify-start bg-[#F0FDF4] hover:bg-[#15803D] hover:text-white border-none">${category.category_name}</button>
        `
        categoryContainer.append(btnCategory)
    }
}

const removeActiveClass = () => {
    const categoryBtns = document.querySelectorAll(".category-btn")
    // console.log(categoryBtns)
    categoryBtns.forEach((btn) => btn.classList.remove("active"))
}

// Load Category Data
const loadCategoryData = (id) => {
    // console.log(id)
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/category/${id}`

    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            removeActiveClass()
            const clickBtn = document.getElementById(`category-btn-${id}`)
            // console.log(clickBtn)
            clickBtn.classList.add("active")
            displayCategoryData(json.plants)
        })
}


// Display Category Data
const displayCategoryData = (plants) => {
    // console.log(plants)
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    plants.forEach(plant => {
        const card = document.createElement("div");
        card.innerHTML = `
              <div class="shadow-sm rounded-xl">
                    <div class=" border-blue-400 p-5 bg-white rounded-xl space-y-3">
                        <img class="rounded-xl w-full h-[186px] object-cover" src="${plant.image}" alt="">
                        <h1 class="font-semibold text-xl" onclick="loadWord(${plant.id})">${plant.name}</h1>
                        <p>${plant.description.slice(0, 100)}....</p>
                        <div class="flex justify-between items-center">
                            <button class="btn h-7 rounded-lg bg-green-200 text-green-700">${plant.category}</button>
                            <h2 class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</h2>
                        </div>
                        <button onclick="loadAddCartBtn(${plant.id})" class="btn w-full rounded-xl bg-[#15803D] text-white">Add to Cart</button>
                    </div>
                </div>
        `
        cardContainer.append(card)
    })
    manageSpinner()
}


// https://openapi.programming-hero.com/api/plant/1
// const loadAllId = () => {
// const url = "https://openapi.programming-hero.com/api/plant/${id}";
// fetch(url)
//     .then((res) => res.json())
//     .then((json) => {
//         displayAllId(json)
//     })
// }

// const url = `https://openapi.programming-hero.com/api/plant/${id}`;


const carts = [];


const loadAddCartBtn = (id) => {
    // console.log(id)

    const url = `https://openapi.programming-hero.com/api/plant/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            // console.log(json)


            const exit = carts.find((item) => item.id === json.plants.id)

            if (exit) {
                exit.quantity++;
            }
            else {
                carts.push({
                    ...json.plants,
                    quantity: 1
                })
            }
            displayAddCartBtn(carts)
        })
}

// {
//     "status": true,
//     "message": "successfully fetched plant data",
//     "plants": {
//         "id": 1,
//         "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
//         "name": "Mango Tree",
//         "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
//         "category": "Fruit Tree",
//         "price": 500
//     }
// }

const displayAddCartBtn = (carts) => {
    // console.log(carts)


    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = "";

    let total = 0;

    carts.forEach((cart) => {
        // console.log(cart)

        total += cart.price * cart.quantity;
        // document.getElementById("total-price").innerText = total;

        const cardBox = document.createElement("div");

        cardBox.innerHTML = `
                  <div class="flex justify-between items-center p-3 history-card w-[216px] bg-[#F0FDF4] rounded-xl mb-3">
                        <div class="">
                            <h1">${cart.name}</h1>
                            <div class="flex space-x-2 space-y-1 text-gray-400">
                                <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="text-xl">${cart.price}</span></p>
                                <p>X</p>
                                <p class="text-xl"><span>${cart.quantity}</span></p>
                            </div>
                           </div>
                          <div class="text-gray-500">X
                          </div>
                    </div>
                    <div id="total-price"></div>
`;
        cartContainer.append(cardBox)
    })
    document.getElementById("total").innerText = total
}

// spinner 
const manageSpinner = (status)=>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("card-container").classList.add("hidden")
    }
    else{
        document.getElementById("card-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }
}