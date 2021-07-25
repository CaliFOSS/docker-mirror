docmir
======

A docker hub mirror application

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/docmir.svg)](https://npmjs.org/package/docmir)
[![Downloads/week](https://img.shields.io/npm/dw/docmir.svg)](https://npmjs.org/package/docmir)
[![License](https://img.shields.io/npm/l/docmir.svg)](https://github.com/CaliFOSS/docker-mirror/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g docmir
$ docmir COMMAND
running command...
$ docmir (-v|--version|version)
docmir/0.5.2 darwin-x64 node-v16.2.0
$ docmir --help [COMMAND]
USAGE
  $ docmir COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`docmir auth [PROVIDER]`](#docmir-auth-provider)
* [`docmir create-repo PROVIDER REPONAME`](#docmir-create-repo-provider-reponame)
* [`docmir create-sync PROVIDER REPONAME TAG`](#docmir-create-sync-provider-reponame-tag)
* [`docmir help [COMMAND]`](#docmir-help-command)
* [`docmir pull [IMAGE] [TAG]`](#docmir-pull-image-tag)
* [`docmir push PROVIDER IMAGE REPOURL TAG`](#docmir-push-provider-image-repourl-tag)
* [`docmir search-tags IMAGENAME [PROVIDER]`](#docmir-search-tags-imagename-provider)

## `docmir auth [PROVIDER]`

Set Docker user and password, and validate credentials with provider

```
USAGE
  $ docmir auth [PROVIDER]

ARGUMENTS
  PROVIDER  (ecr|docker) [default: docker] The registry provider to be working with

OPTIONS
  -h, --help                       show CLI help
  -p, --userPassword=userPassword  docker password
  -r, --repository=repository      Repository url
  -u, --userName=userName          docker username
```

_See code: [src/commands/auth.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.5.2/src/commands/auth.ts)_

## `docmir create-repo PROVIDER REPONAME`

Create a repo for the provider

```
USAGE
  $ docmir create-repo PROVIDER REPONAME

ARGUMENTS
  PROVIDER  (ecr|docker) The registry provider you are using
  REPONAME  Name you want the repo to be called. By defualt syncs are created with the name of the repo

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/create-repo.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.5.2/src/commands/create-repo.ts)_

## `docmir create-sync PROVIDER REPONAME TAG`

This command creates a sync with a provider.  It stores everything to local file for future syncs

```
USAGE
  $ docmir create-sync PROVIDER REPONAME TAG

ARGUMENTS
  PROVIDER  (ecr|docker) The registry provider
  REPONAME  Name of the docker repo you want to sync
  TAG       The tag you want to start the sync with

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/create-sync.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.5.2/src/commands/create-sync.ts)_

## `docmir help [COMMAND]`

display help for docmir

```
USAGE
  $ docmir help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `docmir pull [IMAGE] [TAG]`

Will pull an image from docker hub directly to local machine

```
USAGE
  $ docmir pull [IMAGE] [TAG]

ARGUMENTS
  IMAGE  Image to pull from dockerhub
  TAG    Tag to pull from dockerhub.  Defaults to latest if not used

OPTIONS
  -h, --help  Help command
```

_See code: [src/commands/pull.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.5.2/src/commands/pull.ts)_

## `docmir push PROVIDER IMAGE REPOURL TAG`

Push an Image with tag to provider registry

```
USAGE
  $ docmir push PROVIDER IMAGE REPOURL TAG

ARGUMENTS
  PROVIDER  (ecr|docker) The provider you will push images to
  IMAGE
  REPOURL
  TAG

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/push.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.5.2/src/commands/push.ts)_

## `docmir search-tags IMAGENAME [PROVIDER]`

Searches dockerhub for available images of the docker registry

```
USAGE
  $ docmir search-tags IMAGENAME [PROVIDER]

ARGUMENTS
  IMAGENAME  Image you want to get tags from
  PROVIDER   (ecr|docker) [default: docker] The registry provider to search.

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/search-tags.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.5.2/src/commands/search-tags.ts)_
<!-- commandsstop -->
