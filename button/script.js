// function myFunction() {
// 	const button = document.getElementByClassName('theButton');
// 	let buttonTop = button.style.top;
// 	let buttonLeft = button.style.left;
// 	let evt = new MouseEvent("click", {
// 		buttonTop = "200px";
// 		buttonLeft = "200px";
// 	});

// 	button.dispatchEvent(evt);
// }

// document.getElementsByClassName('theButton').addEventListener('click', myFunction);

const button = document.getElementsByClassName('theButton');

button.addEventListener('click', event => {
  button.style.top = "200px";
  button.style.left = "200px";
});
