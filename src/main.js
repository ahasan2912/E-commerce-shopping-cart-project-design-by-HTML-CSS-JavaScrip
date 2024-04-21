let shop = document.getElementById('shop');

// !Made a Object inside the Array 
// let shopItemsData = [
//   {
//   id: "one",
//   name: "Casual Shirt",
//   price: 45,
//   desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//   img: "image/img-1.jpg", 
// },
// {
//   id: "two",
//   name: "Office Shirt",
//   price: 100,
//   desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//   img: "image/img-2.jpg",
// },
// {
//   id: "three",
//   name: "T Shirt",
//   price: 25,
//   desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//   img: "image/img-3.jpg",
// },
// {
//   id: "four",
//   name: "Mens Suit",
//   price: 300,
//   desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
//   img: "image/img-4.jpg",
// }
// ];
// !Store the Data inside basket when the click event.
let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = function(){
    return (shop.innerHTML = shopItemsData.map(function(x){
        let {id, name, price, desc, img} = x;
        let search = basket.find((x) => x.id === id) || [];
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
              <div id=${id} class="quantity">
              ${search.item === undefined? 0: search.item}
              </div>
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
  //basket = basket.filter((x) => x.item !== 0);  
  //console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("data",JSON.stringify(basket));
};
 
let decrement = (id)=>{ 
  let selectedItem = id;
  let search = basket.find((x)=> x.id === selectedItem.id);

  if(search === undefined) return;
  else if (search.item === 0) return;
  else{
    search.item-= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  //console.log(basket);
  localStorage.setItem("data",JSON.stringify(basket));
};

let update = (id)=>{
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation()
}; 
//return a total single value and initial value of total is 0. 
let calculation = () =>{
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0);
}
calculation();
