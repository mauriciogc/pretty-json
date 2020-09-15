/* global document*/
import "../pretty-json.js";

const pj = document.querySelector("pretty-json");

pj.json = {
	id: 1001,
	type: "donut",
	name: "Cake",
	price: 2.55,
	available: true,
	arr: [1, 2, 3, 4, 5],
	topping: [
		{ id: 5001, type: "None" },
		{ id: 5002, type: "Glazed" },
		{ id: 5005, type: "Sugar" },
		{ id: 5006, type: "Powdered Sugar" },
		{ id: 5003, type: "Chocolate" },
		{ id: 5004, type: "Maple" },
	],
	link: "http://www.google.com",
	other: null,
	other2: undefined,
	fn: function () {},
};

document.addEventListener("click", (e) => {
	const isButton = e.target.nodeName === "BUTTON";
	const id = e.target.id;
	if (!isButton) return;

	if (id === "withQuotes") {
		pj.options = { ...pj.options, withQuotes: !pj.options.withQuotes };
	} else {
		pj.options = {
			...pj.options,
			allCollapsable: !pj.options.allCollapsable,
		};
	}
});
