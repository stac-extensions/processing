# Contributing

All contributions are subject to the
[STAC Specification Code of Conduct](https://github.com/radiantearth/stac-spec/blob/master/CODE_OF_CONDUCT.md).
For contributions, please follow the
[STAC specification contributing guide](https://github.com/radiantearth/stac-spec/blob/master/CONTRIBUTING.md).
The rules below add the specifics of this repository. They apply to all contributors, people and AI agents.

## Repository content

| Path                      | Content |
| ------------------------- | ------- |
| `README.md`               | The specification. It is the source of truth. |
| `json-schema/schema.json` | The JSON Schema that validates the fields. |
| `examples/`               | STAC documents that show the extension. The tests validate them. |
| `CHANGELOG.md`            | The list of changes, in the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format. |

## Scope

Before you propose a new field, relation type or role, make sure that it is in the scope of the extension.
The [Scope section of the README](README.md#scope) gives the scope and a test for new proposals.
If an existing field or relation type can already carry the information, prefer a better description or a new example to a new field.
If you are not sure, open an issue before you write the change.

## Rules for changes

- Keep changes small. One subject for each pull request.
- A change to a field needs four updates: the table in `README.md`, `json-schema/schema.json`, one example in `examples/`
  and one entry in `CHANGELOG.md` below `[Unreleased]`.
- Relation types and asset roles are defined only in `README.md`. The JSON Schema does not validate them.
- Do not change the version. The schema identifier, `package.json` and the release headings in `CHANGELOG.md`
  change only when a maintainer makes a release.
- Do not remove or rename a field, and do not make the validation more strict, without an agreement of the maintainers.
  These are breaking changes.
- Use real data in examples when possible. Do not invent identifiers or values for real datasets.
- The stability that users can expect, and thus the review that a change needs, depends on the
  [maturity classification](https://github.com/radiantearth/stac-spec/tree/master/extensions/README.md#extension-maturity) of the extension.

## Running tests

The same checks that run as checks on PRs are part of the repository and can be run locally to verify that changes are valid.
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

The Markdown rules are in `.github/remark.yaml`. The most frequent failures are lines longer than 150 characters,
HTML in Markdown, literal URLs without angle brackets and broken internal links.
