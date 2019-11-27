function loadItems(urlAddress) {
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
				addItem(container, item.name, item.image_url, item.description, item.price, item.special_price);
			});
		}
	});
}

function addItem(block, name, imgSrc, description, oldPrice, price) {
    let newItem = $(
        `
	<div class="item col-md-4 col-sm-12">
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
    </div>
	`
    );
    console.log("block " + block.html());
    block.append(newItem);
    //console.log("out");
}

export {loadItems};