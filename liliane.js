var slideIndex = 1;
showSlides(slideIndex);

var positionImage = function(num) {
	let slide = document.getElementsByClassName('mySlides')[num];
	let img = document.getElementsByTagName('img')[num];
	topPos = (slide.clientHeight / 2) - (img.clientHeight / 2);
 	return topPos;	
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function moveImageUpwards(num) {
	let slide = document.getElementsByClassName('mySlides')[num];
	let img = document.getElementsByTagName('img')[num];
	topPos = (slide.clientHeight / 2) - (img.clientHeight / 2);
	img.style.top = (slide.clientHeight / 2) - (img.clientHeight / 2) + 'px';
	return topPos;
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
  moveImageUpwards(num = slideIndex-1);
  var top = moveImageUpwards(num);
  dotsArrows(slideIndex-1, top); 
  prevNext(num = slideIndex-1, top); 
  positionNrs(num = slideIndex-1, top);  
  caption(num = slideIndex-1, top);
}

function showNavList() {
	document.querySelector('#overlay').style.width = "100%";
	document.querySelector('nav').style.width = "100%";
	document.querySelector('ul').setAttribute('class', 'visible');	
 	let topNav = navList();
	document.querySelector('nav').style.top = topNav + "px";
}

function hideNavList(event) {
	if(event.target.id === "overlay" || event.target.id === "closeNav") {	
		closeOverlay();
	}
}

function closeOverlay() {
	document.querySelector('#overlay').style.width = "0%";
	document.querySelector('nav').style.width = "0%";
	document.querySelector('ul').classList.remove('visible');
	let navList = document.getElementsByClassName('navList');
	for (let i = 0, y = navList.length; i < y; i++) {
		navList[i].children[1].className = navList[i].children[1].className.replace('navText visible', 'navText') 
	}
	document.querySelector('ul li ul').className = document.querySelector('ul li ul').className.replace('subMenu visible', 'subMenu');	
}

function navList() {
	let hoogte = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;	
 	let navig = document.querySelector('#overlay nav').clientHeight;
	let X = document.querySelector('#closeNav');
	let top =  hoogte - ((hoogte / 2) + (navig / 2)) - X.clientHeight;
	return top;
}

function showNavText(id) {
	let tekst = document.querySelector(id).children[1];
	tekst.classList.toggle('visible');
	let topNav = navList();
	document.querySelector('nav').style.top = topNav + "px";		
}

function moveImageUpwards(num) {
	let slide = document.getElementsByClassName('mySlides')[num];
	let img = document.getElementsByTagName('img')[num];	
	if (document.querySelector('main').clientWidth > 450) {
		topPos = (slide.clientHeight / 2) - (img.clientHeight / 2);
		img.style.top = (slide.clientHeight / 2) - (img.clientHeight / 2) + 'px';
		return topPos;
	}
	else { 
		topPos = "";
		img.style.top = "";
		return topPos;
	}
}

function positionNrs(num, pos) {
	let top = pos;
	ua = navigator.userAgent;
	if(ua.indexOf('Firefox') === -1) {
		let img = document.getElementsByTagName('img')[num];
		let marge = window.getComputedStyle(img).marginLeft;
		let numbertext = document.getElementsByClassName('numbertext')[num].style;
		document.getElementsByClassName('numbertext')[num].style.marginLeft = marge;	
		document.getElementsByClassName('numbertext')[num].style.top = top - 15 + 'px';			
	}
	else {
		let img = document.getElementsByTagName('img')[num];	
		let slide = document.getElementsByClassName('mySlides')[num].clientWidth;
		let numbertext = document.getElementsByClassName('numbertext')[num].style;
		let imgMarge = window.getComputedStyle(img).marginLeft;
		imgMarge = imgMarge.slice(0, -2);
		numbertext.marginLeft = (slide / 2) - (img.clientWidth / 2) - imgMarge + "px";	
		numbertext.top = top - 15 + 'px';
	}
}

function OpenHoofdstuk(evt, tabPag) {
    // Get all article elements with class="tabcontent" and hide them - als je al eens op een element hebt geklikt 
    let tabInhoud = document.getElementsByClassName('tabContent');
    for (let i = 0, y = tabInhoud.length; i < y; i++) {
        tabInhoud[i].style.display = "none";
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabPag).style.display = "block";
	
	// Close the navList
	closeOverlay();
}

// Open en sluit het submenu
function openButton(event) {
	var breedte = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;		
	if (event.target.id === "Werk") {
		let menu = document.querySelector('.subMenu');
		menu.classList.toggle('visible');
		let topNav = navList();
		document.querySelector('nav').style.top = topNav + "px";	
 	}	
}

// code die de hoogte van de bollekes bepaalt
function dotsArrows(num, pos) {
	let slide = document.getElementsByClassName('mySlides')[num].clientHeight;
	let img = document.getElementsByTagName('img')[num].clientHeight;
	let nrs = document.getElementsByClassName('numbertext')[num].clientHeight;	
	let dot = document.querySelector('#dotjes').style;
	if (document.querySelector('main').clientWidth < 450) {
		dot.top = "";
		dot.bottom = (slide - nrs - img) - 10 + 'px';
	}
	else {
		dot.bottom = "";
		dot.top = pos - slide + nrs + img + 10 + 'px';			
	}
}

//code die de hoogte en breedte van de pijltjes > en < bepaalt
function prevNext(num, pos) {
	let top = pos;
	let prev = document.querySelector('#prev');
	let next = document.querySelector('#next');
 	let breedte = document.querySelector('.slideshow-container').clientWidth;
	let nrs = document.getElementsByClassName('numbertext')[num].clientHeight;
	let beeldHoogte = document.getElementsByTagName('img')[num].clientHeight;
	let beeldBreedte = document.getElementsByTagName('img')[num].clientWidth;
 	prev.style.top = (beeldHoogte / 2) - nrs + top + 'px';  
	next.style.top = (beeldHoogte / 2) - nrs + top + 'px';  
	prev.style.left = (breedte / 2) - (beeldBreedte / 2) - prev.clientWidth + 'px';	
	next.style.right = (breedte / 2) - (beeldBreedte / 2) - prev.clientWidth + 'px';	
} 

function caption(num, pos) {
	let caption = document.getElementsByClassName('text')[num];
	let beeld = document.getElementsByTagName('img')[num];
	if (document.querySelector('main').clientWidth < 450) {
		caption.style.top = beeld.clientHeight + 5 + 'px';
	}
	else {
		caption.style.top = pos + beeld.clientHeight + 5 + 'px';
	}
}

//zet pijltjes en dotjes opnieuw op de juiste plaats als grootte venster verandert
window.onresize = function() {
	let slide = document.getElementsByClassName('mySlides');
	for (let a = 0; a < slide.length; a++) {
		if (slide[a].style.display === 'block') {;
			moveImageUpwards(num = slideIndex-1);
			var top = moveImageUpwards(num);
			dotsArrows(slideIndex-1, top); 
			prevNext(num = slideIndex-1, top); 
			positionNrs(num = slideIndex-1, top);
			caption(num = slideIndex-1, top);
			return;
		}
	}
}

/*
	let par = document.querySelector("#breedteEnHoogte");
	console.log(par);
	let hoogte = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;	
	let breedte = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	let text = document.createTextNode('hoogte: ' + hoogte  + '  en breedte ' + breedte + '            '  );	
	par.appendChild(text);


window.onload = function() {
	let par = document.querySelector("#breedteEnHoogte");
	console.log(par);
	let hoogte = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;	
	let breedte = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	let text = document.createTextNode('hoogte: ' + hoogte + ' en breedte ' + breedte);	
	par.appendChild(text);
}
*/