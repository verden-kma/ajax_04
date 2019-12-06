import {loadProduct} from "./loadProduct"
import {loadItems} from "./loadItems"

function init() {
        $("#cart-btn").click(function() {
        $(".bg-modal")[0].style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    $('.closeBtn').click(function() {
        $('.bg-modal')[0].style.display = 'none';
        document.body.style.overflow = 'visible';
    });

    $.each($('.quantity'), (i, inputField) => {
        inputField.change(validateQuantity);
    });

    // add purchase action
    $("#order-btn").click(makePurchase);
    updateTotal();
}

function makePurchase(event) {
    var name = $("#name").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    // username must start with a letter and contain at least 1 character
    if (!name.match("^[A-Za-z]\\w*$")) {//"^[A-Za-z]\w*$"
        alert("incorrect name");
        return;
    }
    // (+385) 123 456 7890  most countries have <= than 3 digits for phone code
    if (!phone.match("^(\\+\\d{1,3})?\\d{10}$")){ //^(\+\\d{1,3})?\\d{10}$
        alert("incorrect phone number");
        return;
    }
    // andrii.rozhko@ukma.edu.ua or a@b.c
    if (!email.match("^\\w+(\\.\\w+)*@(\\w+\\.)*\\w+\\.\\w+$")){
        alert("incorrect email address");
        return;
    }
    var ordered = "";
    $.each($(".item-card"), (i, prod) => {
        var quantity = $(prod).find(".quantity")[0].value;

ordered += `products[${quantity}]=${prod.id}&`
    });
    ordered = ordered.substring(0, ordered.length - 1);
    
    var outData = 'token=y2CdmtQz_km1L_K5xVYU' + '&name=' + name 
    + '&phone=' + phone + '&email=' + email + '&' + ordered;

if (ordered == "") {
    alert("error! the cart must not be empty.")
    return;
}

    $.ajax({
        type: "POST",
        cache: false,
        url: "https://nit.tron.net.ua/api/order/add",
        data: outData+"wvvwd",
        success: (response) => { 
            if (response.errors != null) {
                let errorMsg = "incorrect input!";
                if (response.errors.name != null) errorMsg += "\nincorrect username";
                if (response.errors.phone != null) errorMsg += "\nincorrect phone number";
                if (response.errors.email != null) errorMsg += "\nincorrect email";
                alert(errorMsg);
            }
            else alert("Thank you!");
    },
        error: () => alert("Error has occured!")
    });

    $(".products").empty();
    updateTotal();
}

function addProduct(name, price, imgSrc, id) {
    let isDuplicate = false;
    $.each($('.item-card'), (i, card) => {
    if (card.id == id) {
        alert("Such item is already added.");
        isDuplicate = true;
        return;
    }
    });
    if (isDuplicate) return;
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
    $(newProd).find('.quantity').on('change', validateQuantity);
}

function addToCart(event) {
    alert("added");
    $.ajax({
        mathod: "GET",
        cache: false,
        url: `https://nit.tron.net.ua/api/product/${event.target.parentElement.parentElement.id}`,
        success: (prodData) => {
        var price = prodData.special_price == null ? price = prodData.price : prodData.special_price;
        addProduct(prodData.name, price, prodData.image_url, prodData.id)
        updateTotal();
}
    });
    

}

function removeProd(event) {
    event.target.parentElement.parentElement.parentElement.remove();
    updateTotal();
}

function openProduct(event) {
    let categoryInfo = $(".categoryInfo");
    loadProduct(`https://nit.tron.net.ua/api/product/${event.target.parentElement.id}`, categoryInfo[0].innerText, categoryInfo[0].id)
}

function reopenCategory(event) {
    let category = $(".reopen-category")[0];
    if (category.id == -1) {
        loadItems("https://nit.tron.net.ua/api/product/list");
    }
    else {
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