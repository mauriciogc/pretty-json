# \<pretty-json>

![Example](https://github.com/mauriciogc/pretty-json/blob/master/asset/example.png)

## Installation

```bash
npm i
```

```bash
yarn install
```

## Demo

```bash
npm start
```

```bash
yarn start
```

Runs the app in the development mode.
Open http://localhost:8001/demo/ to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## Usage

```html
<pretty-json></pretty-json>

<script type="module">
	/** Watch the demo for more examples **/
	import "pretty-json/pretty-json.js";

	const pj = document.querySelector("pretty-json");

	pj.json = {
		id: 1001, //Number
		type: "donut", //String
		name: "Cake",
		price: 2.55,
		available: true, //Boolean
		arr: [1, 2, 3, 4, 5], //Array
		topping: [
			{ id: 5001, type: "None" }, //Object
			{ id: 5002, type: "Glazed" },
			{ id: 5005, type: "Sugar" },
			{ id: 5006, type: "Powdered Sugar" },
			{ id: 5003, type: "Chocolate" },
			{ id: 5004, type: "Maple" },
		],
		link: "http://www.cake.com", //Link
		other: null, //Null
	};

	//Options:
	// pj.options = {withQuotes: true/false, allCollapsable: true/false}
</script>
```

## Testing with Karma

To run the suite of karma tests, run

```bash
npm run test
```

```bash
yarn test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

```bash
yarn test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.
If you customize the configuration a lot, you can consider moving them to individual files.

## Tips

Does not work "husky"? test...

```bash
rm -rf .git/hooks/
rm -rf node_modules
yarn
```
