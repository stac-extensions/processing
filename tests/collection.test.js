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

	it('should fail validation when providers processing expression is invalid', async () => {
		// given
		example.providers[0]['processing:expression'] = null;

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/providers/0/processing:expression'
					&& error.message === 'must be object',
			)
		).toBeTruthy();
	});

	it('should fail validation when asset processing expression is invalid', async () => {
		// given
		example.assets = {
			'example': {
				'href': 'https://example.org/file.xyz',
				'processing:expression': null,
			}
		};

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/assets/example/processing:expression'
					&& error.message === 'must be object',
			)
		).toBeTruthy();
	});

	it('should fail validation when item asset processing expression is invalid', async () => {
		// given
		example.item_assets = {
			'example': {
				'href': 'https://example.org/file.xyz',
				'processing:expression': null,
			}
		};

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/item_assets/example/processing:expression'
					&& error.message === 'must be object',
			)
		).toBeTruthy();
	});

	it('should fail validation when summary processing expression is invalid', async () => {
		// given
		example.summaries['processing:expression'] = null;

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/summaries/processing:expression'
					&& error.message === 'must be array',
			)
		).toBeTruthy();
	});

	it('should fail validation when summary processing facility is invalid', async () => {
		// given
		example.summaries['processing:facility'] = null;

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/summaries/processing:facility'
					&& error.message === 'must be array',
			)
		).toBeTruthy();
	});

	it('should fail validation when summary processing level is invalid', async () => {
		// given
		example.summaries['processing:level'] = null;

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/summaries/processing:level'
					&& error.message === 'must be array',
			)
		).toBeTruthy();
	});

	it('should fail validation when summary processing lineage is invalid', async () => {
		// given
		example.summaries['processing:lineage'] = null;

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/summaries/processing:lineage'
					&& error.message === 'must be array',
			)
		).toBeTruthy();
	});

	it('should fail validation when summary processing software is invalid', async () => {
		// given
		example.summaries['processing:software'] = null;

		// when
		let valid = validate(example);

		// then
		expect(valid).toBeFalsy();
		expect(
			validate.errors.some(
				(error) =>
					error.instancePath === '/summaries/processing:software'
					&& error.message === 'must be array',
			)
		).toBeTruthy();
	});
});
