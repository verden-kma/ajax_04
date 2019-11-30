import {loadMain} from "./loadMainPage"
import {interaction} from "./interaction"

function loadItems(urlAddress, categoryName = "full list", cateroryID = -1) {
	$.ajax({
		method: "GET",
		cache: false,
		url: urlAddress,
		success: (items) => {
			let content = $("#content");
			content.empty();
			content.append(
                $(`<div class="container-fluid category" >
        	<div class="row">
        	</div>
    		</div>`));
			let container = content.children(":first").children(":first");

			$.each(items, (i, item) => {
				addItem(container, item.name, item.image_url, item.description, item.price, item.special_price, item.id);
			});

			let returnButton = $(`<a id="return-category" href="#"><h3 class="navigation">Categories</h3></a>`);
			returnButton.click((event) => loadMain())
			content.prepend(returnButton);
			content.prepend($(`<h3 id="${cateroryID}" class="text-center categoryInfo">${categoryName}</h3>`))			
		}
	});
}

function addItem(block, name, imgSrc, description, price, specialPrice, id) {
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
    let newItem = $(
        `
	<div id="${id}" class="item col-md-4 col-sm-12">
        <img class="item-image clickable" src="${imgSrc}" alt="${name} img">
        <a href="#" target="_self" class="item-name text-center clickable">
            ${name}
        </a>

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
	`
    );
    block.append(newItem);
}

export {loadItems};