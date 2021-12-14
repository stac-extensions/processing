const axios = require('axios');
const { dirname, join } = require('path');
const iriFormats = require('stac-node-validator/iri.js');

const Schemas = new Map();
const loadSchema = function (uri) {
	let existing = Schemas.get(uri);
	if (existing == null) {
		existing = loadSchemaFromUri(uri);
		Schemas.set(uri, existing);
	}
	return existing;
}

/**
 * function passed in to Ajv instance which allows us to load schemas from a url at run time.
 */
module.exports.loadSchemaFromUri = async function (uri) {
	try {
		let response = await axios.get(uri);
		return response.data;
	} catch (error) {
		throw new Error(`-- Schema at '${uri}' not found. Please ensure all entries in 'stac_extensions' are valid.`);
	}
}

module.exports.AjvOptions = {loadSchema, formats: Object.assign(iriFormats)};
module.exports.rootDirectory = dirname(__dirname);
module.exports.schemaPath = join(module.exports.rootDirectory, 'json-schema/schema.json');
