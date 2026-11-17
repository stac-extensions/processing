# Guidance for AI agents

This file gives instructions to AI coding agents and assistants that work in this repository.
Human contributors can read it as a short contribution checklist.

## What this repository is

This is the specification of the STAC Processing extension. It contains no application code.

| Path                      | Content |
| ------------------------- | ------- |
| `README.md`               | The specification. It is the source of truth. |
| `json-schema/schema.json` | The JSON Schema that validates the fields. |
| `examples/`               | STAC Items and Collections that show the extension. The tests validate them. |
| `CHANGELOG.md`            | The list of changes, in the *Keep a Changelog* format. |

## Scope comes first

The extension records the processing lineage of a data product, for traceability.
It describes the data, not the processor.
The [Scope section of the README](README.md#scope) is the authority. Read it before you propose or review a change.

Before you add a field, a relation type, an asset role or an expression format, apply the test from the README:

1. Does it tell a data user something about the origin or the processing state of the data? If not, stop.
2. Does it describe a tool, a service or a job, independently of the data?
   Then it does not belong here. Point to the Application extension, the MLM extension or the applicable standard.
3. Can an existing field or relation type already carry the information?
   Then propose a better description or an example, not a new field.

If a request is out of scope, say so and give the reason. Do not implement it in a different form.
If you are not sure, ask the maintainer before you write the change.

### Test for new proposals

Proposals for new fields, relation types or roles should pass this test:

1. Does it tell a data user something about the origin or the processing state of *this* data?
   Then it can be part of this extension.
2. Does it describe a tool, a service or a job, and is it also correct without this data?
   Then it belongs to another extension or standard. A link from the data to that resource is the right connection.
3. Can an existing field or relation type already carry the information?
   Then prefer a better description or a new example to a new field.

## Rules for changes

- Keep changes small. One subject for each pull request.
- A change to a field needs four updates: the table in `README.md`, `json-schema/schema.json`, one example in `examples/`
  and one entry in `CHANGELOG.md` below `[Unreleased]`.
- Relation types and asset roles are defined only in `README.md`. The JSON Schema does not validate them.
- Do not change the version. The schema identifier, `package.json` and the release headings in `CHANGELOG.md`
  change only when the maintainer makes a release.
- Do not remove or rename a field, and do not make validation more strict, unless the maintainer asks for it.
  These are breaking changes.
- Do not change the lists of values (processing levels, expression formats) into closed enumerations. They are open on purpose.
- Use real data in examples when possible. Do not invent identifiers for real missions.

## Tests

Run the tests before you say that a change is complete:

```bash
npm install
npm test
```

`npm test` checks the Markdown files (also this one) and validates the examples against the JSON Schema.
`npm run format-examples` corrects the formatting of the examples.

The Markdown rules are in `.github/remark.yaml`. The most frequent failures are lines longer than 150 characters,
HTML in Markdown, literal URLs without angle brackets and broken internal links.

## Writing style

- Write short sentences with simple words. Many readers are not native English speakers.
- Use the terms of the STAC specification: Item, Collection, Asset, Link Object, relation type.
- Use the Earth Observation terms that the README already uses: processing level, processing baseline, datatake, datastrip.
- Give a real example for each new field, e.g. from the Sentinel or Landsat missions.

## When you generate STAC metadata with this extension

- Prefer the Collection for values that are the same for all Items.
- `processing:level` uses the short name: `L1`, not `Level 1`.
- Use `derived_from` links for input products. Do not copy the metadata of the inputs into the Item.
- Put a reference to external code, a container image or a job in a Link Object with the applicable relation type,
  not in `processing:expression`.
- Do not provide a field if the provider does not give the value. Do not guess a processing level or a version.
