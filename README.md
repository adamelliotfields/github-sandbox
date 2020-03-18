# GitHub Sandbox

# Semantic Release Example

![release](https://badgen.net/github/release/adamelliotfields/github-sandbox?icon=github) ![workflow](https://github.com/adamelliotfields/github-sandbox/workflows/build/badge.svg) ![coverage](https://badgen.net/codecov/c/github/babel/babel?icon=codecov&label=coverage) ![dependabot](https://badgen.net/dependabot/adamelliotfields/github-sandbox?icon=dependabot)

> An example project to experiment with GitHub features.

This is a place to play around with GitHub features like Actions, Packages, and Releases.

This is not intended to be a tutorial for the general public, but if you found it from Google and
need help with something or have a suggestion just open an [issue](https://github.com/adamelliotfields/github-sandbox/issues).

## Prerequisites

You need to create a GitHub [Personal Access Token](https://github.com/settings/tokens) with `repo`
and `packages` scopes.

## Actions

Actions are automated jobs that can run on repository events (i.e., on pushing or on creating a pull
request) or on a schedule, like a cron job. They are not limited to just CI/CD.

Actions are written in YAML and live in the [`.github/workflows`](./.github/workflows) folder in
your project. You can have multiple workflow files and you can name them whatever you want (i.e.,
`test.yml` like Bootstrap or `main.yml` like Redux).

Actions can also be shared and GitHub has provided many "official" actions (i.e., `checkout`,
`cache`, and `setup-node`). You can also reference a specific tag (or branch/commit) of an action to
use (e.g., `checkout@v2`).

You can also run your actions locally in Docker containers using the [`act`](https://github.com/nektos/act)
tool.

The workflow in this project requires the `GH_TOKEN` secret to be set in your repository settings.
The value should be your Personal Access Token.

## Releases

We'll use GitHub Releases instead of manually updating a Changelog. To automate this, we'll use
[`semantic-release`](https://github.com/semantic-release/semantic-release) in conjunction with the
[Angular Commit Message Format](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

You'll need to create a secret to store your Personal Access Token.

You can run `semantic-release` locally. Without the `CI` environment variable set, it will default
to dry-run mode. However, you will need to assign the `GH_TOKEN` and `NPM_TOKEN` environment
variables to your Personal Access Token:

```bash
export GH_TOKEN=
export NPM_TOKEN=
```

### Branch protection rules

You want to ensure nobody, including yourself, can push directly to `master` and that Pull Request
commits are squashed. To do this, you need to create a branch protection rule for `master`. The most
important rules to enable are:

- Require pull request reviews before merging.
- Require linear history.

Note that the **Branches** settings will not be available until you've pushed to a branch.

### Merge button

Under **Options**, uncheck **Allow merge commits** and **Allow rebase merging** as we only want
squashed commits.

Now when you approve a Pull Request, you'll be prompted for a commit message. It's important that
this commit message follows the correct format so `semantic-release` can appropriately version,
release, and publish your package.

## Packages

At this time, GitHub Packages only supports `@scoped/packages` so it's important that the `name` of
your package (in `package.json`) be scoped to your organization. Also make sure the `repository`
points to your repository on GitHub, and finally, add a `publishConfig` to ensure you don't
accidentally publish to your NPM account.

## Dependabot

Enable the [Dependabot Preview](https://github.com/marketplace/dependabot-preview) app from GitHub
Marketplace. Eventually this will be incorporated into GitHub directly.

The Dependabot settings are in [`.dependabot/config.yml`](./.dependabot/config.yml).

## CodeCov

Enable the [Codecov](https://github.com/marketplace/codecov) app from the GitHub marketplace.

The Codecov action is used in [`.github/workflows/build.yml`](./.github/workflows/build.yml). Public
repositories do not require a Codecov API token.
