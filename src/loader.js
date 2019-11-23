/*
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        loadContent(JSON.parse(xhttp.responseText));
    }
};
xhttp.open("GET", "../assets/main_page_markup.json", true);
xhttp.send();
*/
function loadContent(categories) {

	var block = document.getElementById("backpacks");
		for (var i = 0; i < 3; i++) {
		var name = categories.backpacks[i].name;
		var imgSrc = categories.backpacks[i].imgSrc;
		var onSale = categories.backpacks[i].onSale;
		var oldPrice = categories.backpacks[i].oldPrice;
		var newPrice = categories.backpacks[i].newPrice;
		addItem(name, imgSrc, onSale, oldPrice, newPrice, block);
	}

	block = document.getElementById("male");
		for (var i = 0; i < 3; i++) {
		var name = categories.male[i].name;
		var imgSrc = categories.male[i].imgSrc;
		var onSale = categories.male[i].onSale;
		var oldPrice = categories.male[i].oldPrice;
		var newPrice = categories.male[i].newPrice;
		addItem(name, imgSrc, onSale, oldPrice, newPrice, block);
	}

	block = document.getElementById("female");
	for (var i = 0; i < 3; i++) {
		var name = categories.female[i].name;
		var imgSrc = categories.female[i].imgSrc;
		var onSale = categories.female[i].onSale;
		var oldPrice = categories.female[i].oldPrice;
		var newPrice = categories.female[i].newPrice;
		addItem(name, imgSrc, onSale, oldPrice, newPrice, block);
	}
	console.log('loaded');
}



function addItem(name, imgSrc, onSale, oldPrice, price, block) {
	var newItem = document.createElement('div');
	newItem.classList.add("item");
	newItem.classList.add("col-md-4"); 
	newItem.classList.add("col-sm-12"); 
	if (!onSale) oldPrice = "";
	newItem.innerHTML = 
	`
        <img class="item-image" src=" ${imgSrc}" alt="${name} img">
        <a href="#" target="_self" class="item-name text-center">
            ${name}
        </a>
        <div class="item-info">
            <span class="price item-info-entity">
		${price} 
		</span>
            <span class="old-price item-info-entity">
		${oldPrice}
			</span>
            <button class="btn buy-btn item-info-entity">
                add
            </button>
        </div>
	`
	block.append(newItem);
}

export {loadContent};