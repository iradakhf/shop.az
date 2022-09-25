function getItemsFromBasket() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let item = '';
    basket.forEach(element => {
        item += `
        <div class="col-lg-4">
        <img src=${element.Image} alt="">
        <h6>${element.Title}</h6>
        <p>${element.Price}</p>
        <p>count : ${element.Count}</p>
        <p>totalPrice : ${parseFloat(element.Price)*parseFloat(element.Count)}</p>


        
      </div>
      `
      document.querySelector('main #Cart .basket-list').innerHTML = item;
    });
}
getItemsFromBasket();