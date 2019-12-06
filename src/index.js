import './scss/main.scss';
//import 'bootstrap'; github requires cdn in best case
//import $ from 'jquery';
window.$ = window.jQuery = $;

import {loadMain} from "./loadMainPage";
import {interaction} from "./interaction";


$(document).ready(() => { 
    loadMain();  
    interaction();
});


