import {loadProduct} from "./loadProduct"
import {loadItems} from "./loadItems"

function init() {
    // alert("init started");
        $("#cart-btn").click(function() {
            console.log('Opening of cart');
        $(".bg-modal")[0].style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    $('.close').click(function() {
        $('.bg-modal')[0].style.display = 'none';
        document.body.style.overflow = 'visible';
    });


    // $.each($('.delete-btn'), (i, removeBtn) => {
    //     console.log(removeBtn);

    //     $(removeBtn).click(removeProd);
    // });

    // $('.delete-btn').on('click', removeProd);

    $.each($('.quantity'), (i, inputField) => {
        inputField.change(validateQuantity);
    });

    // addButtonListeners();

    // add purchase action
    $("#order-btn").click(makePurchase);
    updateTotal();
}

function makePurchase(event) {
    alert("Thank you.");
    $(".products").empty();
    updateTotal();
}

function addProduct(name, price, imgSrc, id) {
    $.each($('.item-card'), (i, card) => {
    if (card.id == id) {
        alert("Such item is already added.");
        return;
    }
    });
    var newProd = document.createElement('div');
    newProd.classList.add('container');
    newProd.classList.add('markup-goods');
    var products = document.getElementsByClassName('products')[0];
    newProd.innerHTML = `
    <div id="${id}" class="row item-card">
        <div class="prod col-5">
            <img class="prod-img" src="${imgSrc}" alt="prod-img">
            <span class="prod-name">${name}</span>
        </div>
        <span class="col-3 price">${parseInt(price)}</span>
        <div class="col-4 quantity-block">
            <input class="quantity" type="number" value="1">
            <button class="btn btn-danger delete-btn">del</button>
        </div>
    </div>
`
    products.append(newProd);
    // add listeners to this devare button as it is not listened by default
    // newProd.getElementsByClassName('delete-btn')[0].addEventListener('click', (event) => { console.log("from addProduct"); removeProd(event)});
    // newProd.getElementsByClassName('quantity')[0].addEventListener('change', validateQuantity);
    $(newProd).find('.quantity').on('change', validateQuantity);
}

function addToCart(event) {
    //console.log(`https://nit.tron.net.ua/api/product/${event.target.parentElement.parentElement.id}`);
    /*let card = event.target.parentElement.parentElement;
    let price = card.getElementsByClassName('price')[0].innerText;
    let name = card.getElementsByClassName('item-name')[0].innerText;
    let imgSrc = card.getElementsByClassName('item-image')[0].src;
    let id = card.id; */
    
    //let prodID = event.target.parentElement.parentElement.id;
    $.ajax({
        mathod: "GET",
        cache: false,
        url: `https://nit.tron.net.ua/api/product/${event.target.parentElement.parentElement.id}`,
        success: (prodData) => {
        addProduct(prodData.name, prodData.price, prodData.image_url, prodData.id)
        updateTotal();
}
    });
    

}

function removeProd(event) {
    console.log("removeProd");
    event.target.parentElement.parentElement.parentElement.remove();
    updateTotal();
}

function openProduct(event) {
    console.log("openProduct");
    let categoryInfo = $(".categoryInfo");
    console.log(categoryInfo[0].innerText, categoryInfo[0].id)
    loadProduct(`https://nit.tron.net.ua/api/product/${event.target.parentElement.id}`, categoryInfo[0].innerText, categoryInfo[0].id)
}

function reopenCategory(event) {
    let category = $(".reopen-category")[0];
    if (category.id == -1) {
        loadItems("https://nit.tron.net.ua/api/product/list");
    }
    else {
        console.log(`https://nit.tron.net.ua/api/product/list/category/${category.id}`)
        loadItems(`https://nit.tron.net.ua/api/product/list/category/${category.id}`, category.innerText, category.id);
    }
}

function validateQuantity(event) {
    var quant = event.target;
    if (isNaN(quant.value) || quant.value <= 0) {
        quant.value = 1;
    }
    quant.value = parseInt(Math.round(quant.value));
    updateTotal();
}

function updateTotal() {
    var prods = document.getElementsByClassName('products')[0];
    var containers = prods.getElementsByClassName('markup-goods');
    // nothing was added to cart
    if (containers == null) return;
    var remainingTotal = 0;
    for (var i = 0; i < containers.length; i++) {
        var card = containers[i];

        var priceElement = card.getElementsByClassName('price')[0];
        var quantityElement = card.getElementsByClassName('quantity')[0];

        var price = parseFloat(priceElement.innerText.replace('₴', ''));
        var quantity = quantityElement.value;
        remainingTotal += price * quantity;
    }
    remainingTotal = Math.round(remainingTotal * 100) / 100;
    document.getElementById('total').innerText = "₴" + remainingTotal;
}

// при спрацьовуванні слухача, подія піднімається до рівня документа
    $(document).on('click', '.delete-btn', removeProd);
    $(document).on('click', '.buy-btn', addToCart);
    $(document).on('click', '.clickable', openProduct);
    $(document).on('click', '.reopen-category', reopenCategory);

export {init as interaction};