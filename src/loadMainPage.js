import {loadItems} from "./loadItems"

function loadMain() {
	$.ajax({
	method: "GET",
	cache:false,
	url: "https://nit.tron.net.ua/api/category/list",
	success:(categories) => {
	let catContainer = $(`
	<span id="category-span">Categories</span>
    <a href="#" id="full-list"><img style = "width: 50px; height: 50px;"src="./assets/th-solid.svg" alt="all products"></a>
    <ul class="category-list">        
    </ul>
    `);
    $("#content").append(catContainer);
    $("#full-list").click((event) => loadItems("https://nit.tron.net.ua/api/product/list"));
	$.each(categories, (i, category) => {
	let newCat = $(`<a href="#" class="category-link" id="${category.id}">
            <li>
                <h3 class="category-name">${category.name}</h3>
            </li>
        </a>`);
	newCat.click((event) => loadItems("https://nit.tron.net.ua/api/product/list/category/"
	 + $(event.target).parent().parent().attr("id")));
	$(".category-list").append(newCat);
})
	}
});
};

export {loadMain};