import {loadCategory} from "./loadCategoryItems"

function loadMain() {
	$.ajax({
	method: "GET",
	cache:false,
	url: "https://nit.tron.net.ua/api/category/list",
	success:(categories) => {
$.each(categories, (i, category) => {
	let newCat = $(`<a href="#" class="category-link" id="${category.id}">
            <li>
                <h3 class="category-name">${category.name}</h3>
            </li>
        </a>`);
	addListener(newCat);
	$(".category-list").append(newCat);
})
	}
});
};

function addListener(elem) {
	elem.click((event) => {
		//console.log("Load items from " + e.innerText + " with id = " + e.parent().parent().attr("id"));
		loadCategory($(event.target).parent().parent().attr("id"));
	});
}

export {loadMain};