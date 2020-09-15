/*global customElements*/
import { LitElement, html, css } from "lit-element";
const tagName = "pretty-json";

const style = css`
	.json-renderer {
		display: flex;
		justify-content: center;
	}
	.json-container {
		box-shadow: 0px 0px 28px -8px rgba(150, 150, 150, 1);
		background-color: #fff;
		overflow: auto;
		width: 50%;
		max-height: 60vh;
		padding: 20px 30px;
		margin: 20px;
	}
	.json-body {
		width: 100%;
		font: 13px/18px monospace;
		-webkit-font-smoothing: antialiased;
	}
	ul.json-dict,
	ol.json-array {
		list-style-type: none;
		margin: 0;
		border-left: 1px dotted #dbdbdb;
		padding-left: 2em;
	}
	.json-string {
		color: #008200;
	}
	.json-literal {
		color: #069;
		font-weight: 600;
	}
	.json-toggle {
		position: relative;
		color: inherit;
		text-decoration: none;
	}
	.json-toggle:before {
		content: "\\25B6";
		transform: rotate(90deg);
		color: #c0bebe;
		position: absolute;
		display: inline-block;
		width: 0.5em;
		font-size: 0.8em;
		left: -1.5em;
	}
	.json-toggle.collapsed:before {
		content: "\\25B6";
		transform: rotate(0deg);
		font-size: 0.8em;
	}
	.json-placeholder {
		color: #c0bebe;
		text-decoration: none;
	}
	.hide {
		display: none;
	}
`;

export class PrettyJson extends LitElement {
	static get properties() {
		return {
			json: { type: Object },
			options: { type: Object },
			_functions: { type: Object },
		};
	}
	constructor() {
		super();
		this.json = {};
		this.options = { withQuotes: false, allCollapsable: false };

		this._functions = {
			array: this._createArray.bind(this),
			object: this._createObject.bind(this),
			string: this._createString.bind(this),
			number: this._createLiteral.bind(this),
			boolean: this._createLiteral.bind(this),
			null: this._createLiteral.bind(this),
			undefined: this._createLiteral.bind(this),
		};
	}
	_dataType(data) {
		return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
	}
	_isCollapsable(arg) {
		return arg instanceof Object && Object.keys(arg).length > 0;
	}
	_isUrl(string) {
		var regexp = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
		return regexp.test(string);
	}
	_addComa(validate) {
		return validate ? html`,` : null;
	}
	_createKey(key, value, options) {
		const { withQuotes } = options;
		let keyRepr = withQuotes
			? html`<span class="json-string">"${key}"</span>`
			: html`${key}`;

		return html`${this._collapsable(value, options, keyRepr)}`;
	}
	_createPlaceholder(data, { allCollapsable }) {
		const count = data.length;
		return html` <span class="json-placeholder ${allCollapsable ? "" : "hide"}">
			${data.length + (count > 1 ? " items" : " item")}
		</span>`;
	}
	_onHandlerToogle(e) {
		e.preventDefault();
		const el = e.currentTarget;
		el.classList.toggle("collapsed");
		el.nextElementSibling.classList.toggle("hide");
		el.nextElementSibling.nextElementSibling.classList.toggle("hide");
	}
	_collapsable(value, { allCollapsable }, _html = null) {
		return this._isCollapsable(value)
			? html`<a
					href="#"
					class="json-toggle ${allCollapsable ? "collapsed" : ""}"
					@click=${this._onHandlerToogle}
			  >
					${_html}
			  </a>`
			: html`${_html}`;
	}
	_createArray(data, options) {
		let _html = html`[]`;

		if (data.length > 0) {
			_html = html`[
				<ol class="json-array ${options.allCollapsable ? "hide" : ""}">
					${data.map(
						(item, index) => html` <li>
							${this._collapsable(item, options)}
							${this.jsonToHtml(item, options)}${this._addComa(
								index < data.length - 1
							)}
						</li>`
					)}
				</ol>
				${this._createPlaceholder(data, options)} ]`;
		}
		return _html;
	}
	_createObject(data, options) {
		const keys = Object.keys(data);
		let _html = html`{}`;
		let key_count = keys.length;

		if (key_count > 0) {
			_html = html`{
				<ul class="json-dict ${options.allCollapsable ? "hide" : ""}">
					${keys.map(
						(key) => html` <li>
							${this._createKey(key, data[key], options)}:
							${this.jsonToHtml(data[key], options)}${this._addComa(
								--key_count > 0
							)}
						</li>`
					)}
				</ul>
				${this._createPlaceholder(keys, options)} }`;
		}
		return _html;
	}
	_createString(data) {
		let _html;
		_html = this._isUrl(data)
			? html`<a href=${data} class="json-string">${data}</a>`
			: html`<span class="json-string">"${data}"</span>`;

		return _html;
	}
	_createLiteral(data) {
		return html`<span class="json-literal">${data}</span>`;
	}
	jsonToHtml(json, options) {
		const dataType = this._dataType(json);
		let _html = html`Not found [${dataType}] => ${json}`;

		if (this._functions[dataType]) {
			if (["null", "undefined"].includes(dataType)) {
				json = dataType;
			}
			_html = this._functions[dataType](json, options);
		}

		return html`${_html}`;
	}

	render() {
		return html`
			<style>
				${style}
			</style>
			<div class="json-renderer">
				<div class="json-container">
					<div class="json-body">
						${this._collapsable(this.json, this.options)}
						${this.jsonToHtml(this.json, this.options)}
					</div>
				</div>
			</div>
		`;
	}
}
customElements.define(tagName, PrettyJson);
