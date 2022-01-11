const { join } = require('path');
const { promises } = require('fs');
const { AjvOptions, rootDirectory, schemaPath } = require('./validation.js');
const ajv = new (require('ajv'))(AjvOptions);

const examplePath = join(rootDirectory, 'examples/item.json');

let validate;
beforeAll(async () => {
	const data = JSON.parse(await promises.readFile(schemaPath));
	validate = await ajv.compileAsync(data);
});

describe('Item example', () => {
	it('should pass validation', async () => {
		// given
		const example = JSON.parse(await promises.readFile(examplePath));

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeTruthy();
	});

	it('should fail validation with invalid properties processing:software value', async () => {
		// given
		const example = JSON.parse(await promises.readFile(examplePath));
		example['properties']['processing:software'] = null;

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/properties/processing:software' &&
					error.message === 'must be object',
			),
		).toBeTruthy();
	});

	it('should fail validation with invalid asset processing:software value ', async () => {
		// given
		const example = JSON.parse(await promises.readFile(examplePath));
		example['assets']['manifest']['processing:software'] = null;

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/assets/manifest/processing:software' &&
					error.message === 'must be object',
			),
		).toBeTruthy();
	});
});
