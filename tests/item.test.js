const {join} = require('path');
const {promises} = require('fs');
const {AjvOptions, rootDirectory, schemaPath} = require('./validation.js');
const ajv = new (require('ajv'))(AjvOptions);

const examplePath = join(rootDirectory, 'examples/item.json');

let validate;
beforeAll(async () => {
	const data = JSON.parse(await promises.readFile(schemaPath));
	validate = await ajv.compileAsync(data);
});

let example;
beforeEach(async () => {
	example = JSON.parse(await promises.readFile(examplePath));
});

describe('Item example', () => {
	it('should pass validation', async () => {
		let valid = validate(example);

		expect(valid).toBeTruthy();
	});

	it('should fail validation when processing expression is invalid', async () => {
		// given
		example.properties = {'processing:expression': null};

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/properties/processing:expression'
					&& error.message === 'must be object',
			)
		).toBeTruthy();
	});
});
