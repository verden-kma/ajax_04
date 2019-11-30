import {loadItems} from "./loadItems"

function loadMain() {
	$.ajax({
	method: "GET",
	cache:false,
	url: "https://nit.tron.net.ua/api/category/list",
	success:(categories) => {
	let container = $("#content");
	container.empty();
	let catContainer = $(`
	<span class="navigation">Categories</span>
    <a href="#" id="full-list"><img style = "width: 50px; height: 50px;"src="./assets/th-solid.svg" alt="all products"></a>
    <ul class="category-list">        
    </ul>
    `);
    $("#content").append(catContainer);
    $("#full-list").click((event) => loadItems("https://nit.tron.net.ua/api/product/list"));
	$.each(categories, (i, category) => {
	let newCat = $(`<div class="category-div"><a href="#" class="category-link" ">
            <li>
                <h3 id="${category.id} class="openCategory">${category.name}</h3>
            </li>
        </a>
        <p class="category-description">${category.description}</p>
        </div>`);
	newCat.click((event) => {
		//let id = $(event.target).parent().parent().attr("id");
		loadItems("https://nit.tron.net.ua/api/product/list/category/"+ category.id, category.name, category.id)});
	$(".category-list").append(newCat);
});
	}
});
};

export {loadMain};