'use strict';
	let btn = document.querySelector("button");
	let nameInp = document.querySelector(".nameInp");
	let phoneInp = document.querySelector(".phoneInp");
	let mailInp = document.querySelector(".mailInp");

	btn.addEventListener("click", function(event){

		if (!nameInp.value.match(/[a-zа-я\s/]{3,50}/i)) {
			nameInp.classList.add('incorrect');
			event.preventDefault();
		} else {
			nameInp.classList.remove('incorrect');
		}
		if (!phoneInp.value.match(/^[0-9-\s+\(\)]{11,30}/)) {
			phoneInp.classList.add('incorrect');
			event.preventDefault();
			} else {
			phoneInp.classList.remove('incorrect');
		}
		
		if (!mailInp.value.match(/^[a-zа-я0-9._-]+@[a-z0-9-_]+\.[a-z0-9-_]{2,4}/iu)) {
			mailInp.classList.add('incorrect');
			event.preventDefault();
			}else {
			mailInp.classList.remove('incorrect');
		}
	});