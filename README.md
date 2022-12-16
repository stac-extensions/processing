# Processing Extension Specification

- **Title:** Processing
- **Identifier:** <https://stac-extensions.github.io/processing/v1.1.0/schema.json>
- **Field Name Prefix:** processing
- **Scope:** Item, Collection
- **Extension [Maturity Classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity):** Candidate
- **Owner**: @emmanuelmathot

Processing metadata is considered to be data that indicate from which processing chain a data originates and how the data itself has been produced.
Overall, it helps to increase traceability and search among processing levels and multiple algorithm versions.

Often, data items are the result of one or more waterfall processing pipeline. Tracing information such as the processing facility,
the algorithm version or the processing date helps in the data version management.

This extension applies to STAC Items and STAC Collections. As these processing information are often closely bound to the Collection level
and therefore are shared across all items, it is recommended adding the fields to the corresponding STAC Collection.

- Examples:
  - [Item example](examples/item.json): Shows the basic usage of the extension in a STAC Item
  - [Collection example](examples/collection.json): Shows the basic usage of the extension in a STAC Collection
- [JSON Schema](json-schema/schema.json)
- [Changelog](./CHANGELOG.md)

## Item Properties and Collection Provider Fields

| Field Name              | Type                | Description |
| ----------------------- | ------------------- | ----------- |
| processing:expression   | [Expression Object](#expression-object) | An expression or processing chain that describes how the data has been processed. Alternatively, you can also link to a processing chain with the relation type `processing-expression` (see below). |
| processing:lineage      | string              | Lineage Information provided as free text information about the how observations were processed or models that were used to create the resource being described [NASA ISO](https://wiki.earthdata.nasa.gov/display/NASAISO/Lineage+Information). For example, `GRD Post Processing` for "GRD" product of Sentinel-1 satellites. [CommonMark 0.29](https://commonmark.org/) syntax MAY be used for rich text representation. |
| processing:level        | string              | The name commonly used to refer to the processing level to make it easier to search for product level across collections or items. The short name must be used (only `L`, not `Level`). See the [list of suggested processing levels](#suggested-processing-levels). |
| processing:facility     | string              | The name of the facility that produced the data. For example, `Copernicus S1 Core Ground Segment - DPA` for product of Sentinel-1 satellites. |
| processing:software     | Map<string, string> | A dictionary with name/version for key/value describing one or more softwares that produced the data. For example, `"Sentinel-1 IPF":"002.71"` for the software that produces Sentinel-1 satellites data. |

These fields can be used in a variety of places:

1. Items:
   - The fields are placed in the properties. At least one field is required to be present.
   - Additionally, STAC allows all fields to be used in the Asset Object.

2. Collections:
   - The fields are usually placed in the [Provider Objects](https://github.com/radiantearth/stac-spec/blob/master/collection-spec/collection-spec.md#provider-object)
     for the `providers` that have the role `producer` or `processor` assigned.
     They don't need to be provided for all providers of the respective role.
   - The fields can also be used in `summaries`, Collection `assets` or Item asset definitions (`item_assets`).
    
   If the extension is given in the `stac_extensions` list, at least one of the fields must be specified in any of the given places listed above.
   Please note that the JSON Schema is not be able to validate the values of Collection summaries.

### Processing Date Time

The time of the processing is directly specified via the `created` properties of the target asset as specified in the [STAC Common metadata](https://github.com/radiantearth/stac-spec/blob/master/item-spec/common-metadata.md#date-and-time)

### Linking the Items

In Items that declare this `processing` extension, it is recommended to add one or more [Links](https://github.com/radiantearth/stac-spec/blob/master/item-spec/item-spec.md#relation-types) with `derived_from` or `via` relationships to the eventual source metadata & data used in the processing. They could be used to trace back the processing history of the dataset.

### Suggested Processing Levels

The `processing:level` is the name that is commonly used to refer to that processing level properties.
The table below shows some processing level used by the industry for some data product.

Each level represents a step in the abstraction process by which data relevant to physical information (raw, level 0, level 1)
are turned into data relevant to geo physical information (level 2, level 3), and finally turned into data relevant to thematic information (level 4)

This list is not exhaustive and can be extended with the processing level specific to a data product.

| Level Name | Description                                                  | Typical data product                                         |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| RAW        | Data in their original packets, as received from the instrument. | [Sentinel-1 RAW](https://sentinel.esa.int/web/sentinel/technical-guides/sentinel-1-sar/products-algorithms/level-0-products/raw) |
| L0         | Reconstructed unprocessed instrument data at full space time resolution with all available supplemental information to be used in subsequent processing (e.g., ephemeris, health and safety) appended. | [Landsat Level 0](https://www.usgs.gov/media/files/landsat-8-level-0-reformatted-data-format-control-book) |
| L1         | Unpacked, reformatted level 0 data, with all supplemental information to be used in subsequent processing appended. Optional radiometric and geometric correction applied to produce parameters in physical units. Data generally presented as full time/space resolution. A wide variety of sub level products are possible (see below). | [Sentinel-1 Level 1](https://sentinel.esa.int/web/sentinel/user-guides/sentinel-1-sar/product-types-processing-levels/level-1) [Sentinel-2 L1A](https://sentinel.esa.int/web/sentinel/user-guides/sentinel-2-msi/product-types/level-1a) |
| L2         | Retrieved environmental variables (e.g., ocean wave height, soil-moisture, ice concentration) at the same resolution and location as the level 1 source data. A wide variety of sub-level products are possible (see below). | [Sentinel-2 L2A](https://earth.esa.int/web/sentinel/technical-guides/sentinel-2-msi/level-2a-processing) |
| L3         | Data or retrieved environmental variables which have been spatiallyand/or temporally re-sampled (i.e., derived from level 1 or 2 products). Such re-sampling may include averaging and compositing.  A wide variety of sub-level products are possible (see below). | [ENVISAT Level-3](http://envisat.esa.int/level3/), [Sentinel-2 L3](https://s2gm.sentinel-hub.com/) |
| L4         | Model output or results from analyses of lower level data (i.e.,variables that are not directly measured by the instruments, but are derived from these measurements) | |

### Expression Object

| Field Name | Type   | Description |
| ---------- | ------ | ----------- |
| format     | string | **REQUIRED** The type of the expression that is specified in the `expression` property. |
| expression | \*     | **REQUIRED** An expression compliant with the `format` specified. The expression can be any data type and depends on the `format` given, e.g. string or object. |

Potential expression formats with examples:

| Format      | Type   | Description | Example |
| ----------- | ------ | ----------- | ------- |
| `gdal-calc` | string | A [`gdal_calc.py`](https://gdal.org/programs/gdal_calc.html) expression based on numpy syntax. | `A*logical_or(A<=177,A>=185)` |
| `openeo`    | object | [openEO process](https://openeo.org/documentation/1.0/developers/api/reference.html#section/Processes) | [Example](https://raw.githubusercontent.com/Open-EO/openeo-processes/1.2.0/normalized_difference.json) |
| `rio-calc`  | string | A [rio-calc](https://rasterio.readthedocs.io/en/latest/topics/calc.html) (RasterIO) expression | `(b4-b1)/(b4+b1)` |

## Relation types

The following types should be used as applicable `rel` types in the
[Link Object](https://github.com/radiantearth/stac-spec/tree/master/item-spec/item-spec.md#link-object).

| Type                  | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| derived_from          | URL to a STAC Item that was used as input data in the creation of this Item. |
| processing-expression | A processing chain (or script) that describes how the data has been processed. |

## Contributing

All contributions are subject to the
[STAC Specification Code of Conduct](https://github.com/radiantearth/stac-spec/blob/master/CODE_OF_CONDUCT.md).
For contributions, please follow the
[STAC specification contributing guide](https://github.com/radiantearth/stac-spec/blob/master/CONTRIBUTING.md) Instructions
for running tests are copied here for convenience.

### Running tests

The same checks that run as checks on PR's are part of the repository and can be run locally to verify that changes are valid. 
To run tests locally, you'll need `npm`, which is a standard part of any [node.js installation](https://nodejs.org/en/download/).

First you'll need to install everything with npm once. Just navigate to the root of this repository and on 
your command line run:
```bash
npm install
```

Then to check markdown formatting and test the examples against the JSON schema, you can run:
```bash
npm test
```

This will spit out the same texts that you see online, and you can then go and fix your markdown or examples.

If the tests reveal formatting problems with the examples, you can fix them with:
```bash
npm run format-examples
```
