import './scss/main.scss';
import 'bootstrap';
import $ from 'jquery';
window.$ = window.jQuery = $;

import {loadMain} from "./loadMainPage";
import {interaction} from "./interaction";


$(document).ready(() => { 
    loadMain();  
    interaction();
});


