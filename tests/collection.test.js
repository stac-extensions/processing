const {join} = require('path');
const {promises} = require('fs');
const {AjvOptions, rootDirectory, schemaPath} = require('./validation.js');
const ajv = new (require('ajv'))(AjvOptions);

const examplePath = join(rootDirectory, 'examples/collection.json');

let validate;
beforeAll(async () => {
	const data = JSON.parse(await promises.readFile(schemaPath));
	validate = await ajv.compileAsync(data);
});

let example;
beforeEach(async () => {
	example = JSON.parse(await promises.readFile(examplePath));
});

describe('Collection example', () => {
	it('should pass validation', async () => {
		let valid = validate(example);

		expect(valid).toBeTruthy();
	});
});
