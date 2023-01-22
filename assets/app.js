/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import './styles/style.css';
import './styles/clesMinute.css';
import './styles/computerReparation.css';
import './styles/tabletteReparation.css';
import './styles/scrollPhones.css';


// start the Stimulus application
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel';
import $ from 'jquery'

import peScrollChange from './peScroll'




document.getElementById("id_responsiveMenuBar").onclick = function openNav() {
    document.getElementById("mySidenav").style.width = "60%";
    document.getElementById("id_responsiveMenuBar").style.display = "none";
};
document.getElementById("closeNavBar").onclick = function openNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("id_responsiveMenuBar").style.display = "block";

};



