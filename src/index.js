import './scss/main.scss';
import 'bootstrap';

import 'jquery';
import {loadContent} from "./loader";
import {initInteraction} from "./interaction";

var content;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        content = JSON.parse(xhttp.responseText);
    }
};
xhttp.open("GET", "../assets/main_page_markup.json", true);
xhttp.send();

$(document).ready(() => {    
    loadContent(content);
    initInteraction();
});


