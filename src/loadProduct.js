// TODO: check calls for this function and fix passed parameters
function loadProduct(url, categoryName, categoryID) {
	$.ajax({
		mathod: "GET",
		cache: false,
		url: url,
		success: (prodData) => {
			load(prodData.id, prodData.name, prodData.description, prodData.image_url,
		 prodData.price, prodData.special_price, categoryName, categoryID)}
	});
}

function load(id, name, description, imgSrc, price, specialPrice, categoryName, categoryID) {
	let special_price = "";
	let old_price = "";

	if (specialPrice == null) {
		specialPrice = "";
		old_price = "price";
	}
	else {
		old_price = "old-price";
		special_price = "special-price";
	}

	let content = $("#content");
	content.empty();
	content.append(							//STYLE ATTRIBUTE USED HERE!!!!!!!!!! (override default class style)
                $(`<a class="category-return" href="#"><h4 id="${categoryID}" class="reopen-category navigation">${categoryName}</h4></a>
                	<h3 class="item-name text-center">${name}</h3>
                	<div class="container-fluid category" >
        	<div class="row">				
        	<div id="${id}" class="item col-md-4 col-sm-12" style="border:none;">
        <img class="item-image clickable" src="${imgSrc}" alt="${name} img">
        <div class="item-info">
            <span class="${special_price} item-info-entity">
		${specialPrice} 
		</span>
            <span class="${old_price} item-info-entity">
		${price}
			</span>
            <button class="btn buy-btn item-info-entity">
                add
            </button>
        </div>
    </div>

    <div class="item-desc">
    		<p>${description}</p>
    		</div>

        	</div>
    		</div>
    		`));
}

export {loadProduct};