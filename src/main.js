let shop = document.getElementById('shop');

let shopItemsData = [
    {
    id: "one",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "image/img-1.jpg", 
},
{
    id: "two",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "image/img-2.jpg",
},
{
    id: "three",
    name: "T Shirt",
    price: 25,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "image/img-3.jpg",
},
{
    id: "four",
    name: "Mens Suit",
    price: 300,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
    img: "image/img-4.jpg",
}
]
// !Store the Data inside basket when the click event.
let basket = [];

let generateShop =() => {
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let {id, name, price, desc, img} = x;
        return `
        <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>$ ${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">0</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>`
    }).join(''));
};

generateShop(); 

let increment = (id)=>{
  let selectedItem = id;
  let search = basket.find((x)=> x.id === selectedItem.id);

  if(search === undefined){
    basket.push({
      id: selectedItem.id,
      item:1,
    });
  }
  else{
    search.item+= 1;
  }
  
  //console.log(basket);
  update(selectedItem.id);
}; 
let decrement = (id)=>{ 
  let selectedItem = id;
  let search = basket.find((x)=> x.id === selectedItem.id);

  if(search.item === 0) return ;
  else{
    search.item-= 1;
  }
  
  //console.log(basket);
  update(selectedItem.id);
};
let update = (id)=>{
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation()
}; 

let calculation = () =>{
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0);
}