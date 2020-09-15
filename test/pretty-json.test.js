/* global describe, it*/
import { html, fixture, expect, elementUpdated } from "@open-wc/testing";

import "../pretty-json.js";

const jsonHelper = {
	id: 1001,
	type: "donut",
	name: "Cake",
	price: 2.55,
	available: true,
	alone: [1],
	arr: [1, 2, 3, 4, 5],
	emptyArr: [],
	emptyObj: {},
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

describe("has properties and attributes and functions", () => {
	it("has a type properties", async () => {
		const el = await fixture(html` <pretty-json></pretty-json> `);

		expect(el.json).to.be.a("object");
		expect(el.options).to.be.an("object");
		expect(el._functions).to.be.a("object");

		expect(el._dataType).to.be.a("function");
		expect(el._isCollapsable).to.be.a("function");
		expect(el._isUrl).to.be.a("function");
		expect(el._addComa).to.be.a("function");
		expect(el._createKey).to.be.a("function");
		expect(el._createPlaceholder).to.be.a("function");
		expect(el._onHandlerToogle).to.be.a("function");
		expect(el._collapsable).to.be.a("function");
		expect(el._createArray).to.be.a("function");
		expect(el._createObject).to.be.a("function");
		expect(el._createString).to.be.a("function");
		expect(el._createLiteral).to.be.a("function");
		expect(el.jsonToHtml).to.be.a("function");
	});

	it("has a default value properties", async () => {
		const el = await fixture(html` <pretty-json></pretty-json> `);

		expect(el.json).to.have.empty;
		expect(el.options).to.have.property("withQuotes", false);
		expect(el.options).to.have.property("allCollapsable", false);
	});

	it("has a value properties per function [_dataType]", async () => {
		const el = await fixture(html` <pretty-json></pretty-json> `);

		expect(el._dataType(100)).to.equal("number");
		expect(el._dataType({})).to.equal("object");
		expect(el._dataType(true)).to.equal("boolean");
		expect(el._dataType([])).to.equal("array");
	});

	it("has a value properties per function [_isCollapsable]", async () => {
		const el = await fixture(html` <pretty-json></pretty-json> `);

		expect(el._isCollapsable(100)).to.be.false;
		expect(el._isCollapsable({})).to.be.false;
		expect(el._isCollapsable({ a: 1 })).to.be.true;
		expect(el._isCollapsable([])).to.be.false;
		expect(el._isCollapsable([1, 2, 3])).to.be.true;
	});

	it("has a value properties per function [_isUrl]", async () => {
		const el = await fixture(html` <pretty-json></pretty-json> `);

		expect(el._isUrl(100)).to.be.false;
		expect(el._isUrl("http://google.com")).to.be.true;
		expect(el._isUrl({ a: 1 })).to.be.false;
		expect(el._isUrl([])).to.be.false;
		expect(el._isUrl(true)).to.be.false;
		expect(el._isUrl("http://")).to.be.false;
	});

	it("has a value properties per function [_addComa]", async () => {
		const el = await fixture(html` <pretty-json></pretty-json> `);

		expect(el._addComa(100).strings[0]).to.equal(",");
		expect(el._addComa("http://google.com").strings[0]).to.equal(",");
		expect(el._addComa({ a: 1 }).strings[0]).to.equal(",");
		expect(el._addComa([]).strings[0]).to.equal(",");
		expect(el._addComa(false)).to.be.null;
		expect(el._addComa("http://").strings[0]).to.equal(",");
	});

	it("has a value properties per function [_createKey]", async () => {
		const el = await fixture(html` <pretty-json></pretty-json> `);

		const val = el._createKey("hello", 100, { withQuotes: false }).values[0]
			.values[0].values[0];

		expect(val).to.equal("hello");
	});

	it("has a value properties per function [_createPlaceholder]", async () => {
		const el = await fixture(html` <pretty-json></pretty-json> `);

		const val = el._createPlaceholder(["a"], { allCollapsable: false })
			.values[1];
		expect(val).to.equal("1 item");
	});
});

describe("properties and attributes changed", () => {
	it("has changed properties at the beginning [options empty and JSON empty]", async () => {
		const el = await fixture(html`
			<pretty-json .json=${{}} .options=${{}}></pretty-json>
		`);

		expect(el.json).to.not.have.property("type");
		expect(el.options).to.not.have.property("withQuotes");
		expect(el.options).to.not.have.property("allCollapsable");
	});

	it("has changed properties at the beginning [JSON empty]", async () => {
		const options = { withQuotes: false, allCollapsable: false };
		const el = await fixture(html`
			<pretty-json .json=${{}} .options=${options}></pretty-json>
		`);

		expect(el.json).to.not.have.property("type");
		expect(el.options).to.have.property("withQuotes", false);
		expect(el.options).to.have.property("allCollapsable", false);
	});

	it("has changed properties at the beginning [all options true and data]", async () => {
		const options = { withQuotes: true, allCollapsable: true };
		const el = await fixture(html`
			<pretty-json .json=${jsonHelper} .options=${options}></pretty-json>
		`);

		expect(el.json).to.have.property("type", "donut");
		expect(el.options).to.have.property("allCollapsable", true);
		expect(el.options).to.have.property("withQuotes", true);
	});

	it("has changed properties at the beginning [all optuions false and data]", async () => {
		const options = { withQuotes: false, allCollapsable: false };
		const el = await fixture(html`
			<pretty-json .json=${jsonHelper} .options=${options}></pretty-json>
		`);

		expect(el.json).to.have.property("type", "donut");
		expect(el.options).to.have.property("allCollapsable", false);
		expect(el.options).to.have.property("withQuotes", false);
	});
});

describe("properties and attributes changed", () => {
	it("Class exist before click", async () => {
		const options = { withQuotes: false, allCollapsable: false };
		const el = await fixture(html`
			<pretty-json .json=${jsonHelper} .options=${options}></pretty-json>
		`);

		const dom = el.shadowRoot.querySelector(".json-toggle");

		dom.click();

		expect(dom.classList.contains("collapsed")).to.be.true;
		expect(dom.nextElementSibling.classList.contains("hide")).to.be.true;
		expect(dom.nextElementSibling.nextElementSibling.classList.contains("hide"))
			.to.be.false;

		dom.click();

		expect(dom.classList.contains("collapsed")).to.be.false;
		expect(dom.nextElementSibling.classList.contains("hide")).to.be.false;
		expect(dom.nextElementSibling.nextElementSibling.classList.contains("hide"))
			.to.be.true;
	});

	it("Class exist before click", async () => {
		const options = { withQuotes: false, allCollapsable: true };
		const el = await fixture(html`
			<pretty-json .json=${jsonHelper} .options=${options}></pretty-json>
		`);

		const dom = el.shadowRoot.querySelector(".json-toggle");

		dom.click();

		expect(dom.classList.contains("collapsed")).to.be.false;
		expect(dom.nextElementSibling.classList.contains("hide")).to.be.false;
		expect(dom.nextElementSibling.nextElementSibling.classList.contains("hide"))
			.to.be.true;

		dom.click();

		expect(dom.classList.contains("collapsed")).to.be.true;
		expect(dom.nextElementSibling.classList.contains("hide")).to.be.true;
		expect(dom.nextElementSibling.nextElementSibling.classList.contains("hide"))
			.to.be.false;
	});
});
