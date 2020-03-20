<h1 align="center">
  GitHub Sandbox
</h1>

<p align="center">
  <a href="https://github.com/adamelliotfields/github-sandbox/releases" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/github/v/release/adamelliotfields/github-sandbox?logo=github&color=brightgreen" alt="" />
  </a>
  <a href="https://github.com/adamelliotfields/github-sandbox/actions" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/github/workflow/status/adamelliotfields/github-sandbox/build?logo=github" alt="build">
  </a>
  <a href="https://codeclimate.com/github/adamelliotfields/github-sandbox" target="_blank" rel="noopener noreferrer">
    <img src="https://badgen.net/codeclimate/maintainability/adamelliotfields/github-sandbox?icon=codeclimate&label=maintainability" alt="maintainability">
  </a>
  <a href="https://codeclimate.com/github/adamelliotfields/github-sandbox" target="_blank" rel="noopener noreferrer">
    <img src="https://badgen.net/codeclimate/coverage/adamelliotfields/github-sandbox?icon=codeclimate&label=coverage" alt="coverage">
  </a>
  <a href="https://codecov.io/gh/adamelliotfields/github-sandbox" target="_blank" rel="noopener noreferrer">
    <img src="https://badgen.net/codecov/c/github/adamelliotfields/github-sandbox?icon=codecov&label=codecov" alt="codecov" />
  </a>
  <img src="https://badgen.net/dependabot/adamelliotfields/github-sandbox?icon=dependabot&label=dependabot" alt="dependabot" />
</p>

> An example project to experiment with GitHub features.

This is a place to play around with GitHub features like Actions, Packages, and Releases.

This is not intended to be a tutorial for the general public but if you found it from Google and
need help with something or have a suggestion just open an [issue](https://github.com/adamelliotfields/github-sandbox/issues).

## Prerequisites

- Create a GitHub [Personal Access Token](https://github.com/settings/tokens) with `repo` and
  `packages` scopes. Store this token as a secret named `GH_TOKEN` in your respository.
- Enable the [Codecov](https://github.com/marketplace/codecov) app from the GitHub marketplace. You
  will also need to generate a Codecov [Upload Token](https://docs.codecov.io/docs/frequently-asked-questions#section-where-is-the-repository-upload-token-found)
  and store it in a secret named `CODECOV_TOKEN` in your repository.
- Create a free [Code Climate](https://codeclimate.com/quality/pricing) account and add your
  repository. In your Code Climate repository settings, copy your Test Reporter ID and store it in a
  secret named `CC_TEST_REPORTER_ID` in your GitHub repository.
- Enable the [Dependabot Preview](https://github.com/marketplace/dependabot-preview) app from GitHub
  Marketplace.

## Actions

Actions are automated jobs that can run on repository events (e.g., on pushing or on creating a pull
request) or on a schedule, like a cron job. They are not limited to just CI/CD.

Multiple Actions make up a Workflow. Workflows are written in YAML and live in the [`.github/workflows`](./.github/workflows)
folder in your project. You can have multiple Workflow files and you can name them whatever you want
(e.g., `test.yml` like Bootstrap or `main.yml` like Redux). If you use README badges, the name of
the Workflow is shown in the badge (so to get "build passing" you have to name your Workflow
"build").

Actions can also be shared and GitHub has provided many "official" actions (e.g., `checkout`,
`cache`, and `setup-node`). You can also reference a specific tag (or branch/commit) of an action to
use (e.g., `checkout@v2`).

You can also run your actions locally in Docker containers using the [`act`](https://github.com/nektos/act)
tool.

## Releases

We'll use GitHub Releases instead of manually updating a Changelog. To automate this, we'll use
[`semantic-release`](https://github.com/semantic-release/semantic-release) in conjunction with the
[Angular Commit Message Format](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

You can use a tool like [`commitizen`](https://github.com/commitizen/cz-cli) to enforce a convention
for your commit messages if you want.

Review the [default rules matching](https://github.com/semantic-release/commit-analyzer/blob/v8.0.1/README.md#default-rules-matching)
to understand when `semantic-release` creates a release. It might make sense to merge all of your
Pull Requests into a `dev` or `next` branch and merge that branch into `master` only when you're
ready to release. You can also always pass `no-release` to the scope of the commit message to
prevent a release.

You can run `semantic-release` locally. Without the `CI` environment variable set, it will default
to dry-run mode. However, you will need to assign the `GH_TOKEN` and `NPM_TOKEN` environment
variables to your Personal Access Token:

```bash
export GH_TOKEN=
export NPM_TOKEN=
```

## Packages

At this time, GitHub Packages only supports `@scoped/packages` so it's important that the `name` of
your package (in `package.json`) be scoped to your organization. Also make sure the `repository`
points to your repository on GitHub, and finally, add a `publishConfig` to ensure you don't
accidentally publish to your NPM account.

All package publishing will be handled by `semantic-release`. However, I recommending publishing
your first release manually:

```bash
git tag v0.1.0
git push --tags origin

touch .npmrc

# Your authToken is your GitHub Personal Access Token
cat <<EOF > .npmrc
@adamelliotfields:registry=https://npm.pkg.github.com/adamelliotfields
//npm.pkg.github.com/:_authToken=
EOF

npm publish
```

## Dependabot

The Dependabot settings are in [`.dependabot/config.yml`](./.dependabot/config.yml).

## Codecov

The Codecov action is used in [`.github/workflows/build.yml`](./.github/workflows/build.yml).

## Code Climate

The Code Climate settings are in [`.codeclimate.yml`](./.codeclimate.yml).
