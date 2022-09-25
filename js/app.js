
let profileList = document.querySelector(".top .profileArrow");
let pr = document.querySelector(".pr");

profileList.addEventListener("click", () => {
    let list = document.getElementById('list');
    if (list.style.display == "block") {
        list.style.display = "none";
        
    }
    else {
        list.style.display = "block";
    }
    
})

document.querySelector("header .second .bottom .menu").addEventListener("click", () => {
    if (document.querySelector("header .second .bottom ul").style.display == "none") {
        document.querySelector("header .second .bottom ul").style.display = "block";       
    }
    else {
        document.querySelector("header .second .bottom ul").style.display = "none";
    }
})
localStorage.setItem('basket', JSON.stringify([]));

let slides = document.querySelectorAll("main #first .sliders .slider");
let slideIndex = 0;
function showSlides() {
    let i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex-1].style.display = "block";
}
setInterval(() => {
    showSlides();
}, 2000);

function getProducts(){
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                let item='';
                data.forEach(element => {
                    item += `
                    <div class="col-lg-3">
                    <div id= ${element.id} class="card">
                        <img src="${element.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${element.title}</h5>
                          <p class="card-text">${element.description.length>20 ? element.description.slice(0,20) + "..." : element.description}</p>
                          <p class="card-text">${element.price} AZN</p>
                          <button id="btn_add" class="btn btn-success">Add to cart <i class="fa-solid fa-cart-shopping"></i></button>
                        </div>
                      </div>
                </div>
                    
                    `
                });

            document.querySelector("#three #list").innerHTML = item;

            })
            .catch(error => console.error())
}
 setTimeout(() => {
    getProducts();
 }, 1000);

 setTimeout(() => {
     let btns = document.querySelectorAll("main #three #list #btn_add");
     for (let btn of btns) {
         btn.addEventListener("click", (e)=>{
            let basket = JSON.parse(localStorage.getItem("basket"));
            let price = e.target.previousElementSibling.innerHTML;
            let title = e.target.parentElement.children[0].innerHTML;
            let id = e.target.parentElement.parentElement.id;
            let image = e.target.parentElement.previousElementSibling.src;
           let existingProduct = basket.find(x => x.Id == id);
           if(existingProduct == undefined){
               basket.push({
                   Id: id,
                    Title : title,
                    Price : price,
                    Image : image,
                    Count: 1
               })

           }
           else{
            existingProduct.Count +=1;
           }
            localStorage.setItem('basket', JSON.stringify(basket));
            countBasket();
        })
     }
    
 },2200);

function countBasket(){
    let basket = JSON.parse(localStorage.getItem('basket'));
    document.querySelector("header .second .top #count").innerHTML = basket.length;

}