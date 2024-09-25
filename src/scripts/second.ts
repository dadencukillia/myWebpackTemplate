import "../styles/second.css";
import myImage from "../images/myImage.jpg";

import gsap from "gsap";
import $ from "jquery";

export const myName: string = "Illia";

const imageElement: HTMLImageElement = document.createElement("img");
imageElement.src = myImage;
imageElement.alt = "Two birds";

$(() => {
	console.log("Ready!");
	$(document.body).append(imageElement);

	gsap.from("img", { duration: 3.0, y: 300 });
});
