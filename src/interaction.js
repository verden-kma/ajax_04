//import 'jquery';
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
console.log('interacted');

function ready() {
        $("#cart-btn").click(function() {
        $(".bg-modal")[0].style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    $('.close').click(function() {
        $('.bg-modal')[0].style.display = 'none';
        document.body.style.overflow = 'visible';
    });

    // devare buttons
    var removeProdButtons = $('.devare-btn');
    for (var i = 0; i < removeProdButtons.length; i++) {
        removeProdButtons[i].click(removeProd);
    }

    // Tron check
    var suspiciousQuantity = $('.quantity');
    for (var i = 0; i < suspiciousQuantity.length; i++) {
        var inputQuantity = suspiciousQuantity[i];
        inputQuantity.change(validateQuantity); // click!!!('change', 
    }

    // add products to cart
    var newComersBtn = $('.buy-btn');
    console.log($('.buy-btn').length, "$('.buy-btn')");
    for (var i = 0; i < newComersBtn.length; i++) {
        newComersBtn[i].click(function(event) {
console.log("add action");

            var card = event.target.parentElement.parentElement;
            var price = card.querySelector('#price')[0].innerText;
            var name = card.querySelector('#item-name')[0].innerText;
            var imgSrc = card.querySelector('#item-image')[0].src;
            addProduct(name, price, imgSrc);
            updateTotal();
        });
    }
    // add purchase action
    var purchase = $('#order-btn');
    purchase.click(makePurchase);
}

function makePurchase() {
    alert("Thank you.");
    var prods = $('.products')[0];
    while (prods.hasChildNodes()) {
        prods.removeChild(prods.firstChild);
    }
    updateTotal();
}

function addProduct(name, price, imgSrc) {
    var newProd = document.createElement('div');
    newProd.classList.add('container');
    newProd.classList.add('markup-goods');
    var products = $('.products')[0];
    var names = $('.prod-name');
    for (var i = 0; i < names.length; i++) {
        if (names[i].innerText == name) {
            alert("Such item is already added.");
            return;
        }
    }
    newProd.innerHTML = `
    <div class="row">
        <div class="prod col-5">
            <img class="prod-img" src="${imgSrc}" alt="prod-img">
            <span class="prod-name">${name}</span>
        </div>
        <span class="col-3 price">${price}</span>
        <div class="col-4 quantity-block">
            <input class="quantity" type="number" value="1">
            <button class="btn btn-danger devare-btn">del</button>
        </div>
    </div>
`
    products.append(newProd);
    // add listeners to this devare button as it is not listened by default
    newProd.querySelector('#devare-btn')[0].click(removeProd);
    newProd.querySelector('#quantity')[0].change(validateQuantity);
}

function removeProd(event) {
    var button = event.target;
    button.parentElement.parentElement.parentElement.remove();
    updateTotal();
}


function validateQuantity(event) {
    var quant = event.target;
    if (isNaN(quant.value) || quant.value <= 0) {
        quant.value = 1;
        console.log('https://ukmaedu-my.sharepoint.com/:i:/g/personal/andrii_rozhko_ukma_edu_ua/EYHNkNgMeaxMgfnkdHrNJIIBSXylfArkCdG2JDh23GNqdg?e=vYa8ef');
    }
    updateTotal();
}



function updateTotal() {
    var prods = $('.products')[0];
    var containers = prods.querySelector('.markup-goods');
    // nothing was added to cart
    if (containers == null) return;
    var remainingTotal = 0;
    for (var i = 0; i < containers.length; i++) {
        var card = containers[i];

        var priceElement = card.querySelector('.price')[0];
        var quantityElement = card.querySelector('.quantity')[0];

        var price = parseFloat(priceElement.innerText.replace('₴', ''));
        var quantity = quantityElement.value;
        remainingTotal += price * quantity;
    }
    remainingTotal = Math.round(remainingTotal * 100) / 100;
    document.getElementById('total').innerText = "₴" + remainingTotal;
}