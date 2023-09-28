# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `processing-execution` relation type to link to the processing execution that produced the data.

## [v1.1.0] - 2022-01-07

### Added

- `processing:expression` to describe how the data has been processed.
- Relation type `processing-expression` to externally describe how the data has been processed.

### Changed

- Updated examples to STAC 1.0.0

### Fixed

- The JSON Schema is more strict and should not have issues with missing required fields in Collections any longer [#3](https://github.com/stac-extensions/processing/issues/3), [#8](https://github.com/stac-extensions/processing/issues/8), [#16](https://github.com/stac-extensions/processing/issues/16)

## [v1.0.0] - 2021-03-08

Initial independent release, see [previous history](https://github.com/radiantearth/stac-spec/commits/4a841605ad83a16f45fcb88ed90117d6c77a7f04/extensions/processing)

### Changed

- `processing:lineage` now allows CommonMark for rich-text representation ([#950](https://github.com/radiantearth/stac-spec/issues/950))

[Unreleased]: <https://github.com/stac-extensions/processing/compare/v1.1.0...HEAD>
[v1.1.0]: <https://github.com/stac-extensions/processing/compare/v1.1.0...v1.0.0>
[v1.0.0]: <https://github.com/stac-extensions/processing/tree/v1.0.0>
