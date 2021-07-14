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
docmir/0.4.1 darwin-x64 node-v16.2.0
$ docmir --help [COMMAND]
USAGE
  $ docmir COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`docmir auth [PROVIDER]`](#docmir-auth-provider)
* [`docmir help [COMMAND]`](#docmir-help-command)
* [`docmir pull [IMAGE] [TAG]`](#docmir-pull-image-tag)
* [`docmir push PROVIDER IMAGE REPOURL TAG`](#docmir-push-provider-image-repourl-tag)
* [`docmir registry PROVIDER COMMAND [REPONAME]`](#docmir-registry-provider-command-reponame)
* [`docmir searchtags [IMAGENAME] [PROVIDER] [SERVER]`](#docmir-searchtags-imagename-provider-server)

## `docmir auth [PROVIDER]`

Working with Authentication for Dockerhub and registry

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

_See code: [src/commands/auth.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.4.1/src/commands/auth.ts)_

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

describe the command here

```
USAGE
  $ docmir pull [IMAGE] [TAG]

ARGUMENTS
  IMAGE  Image to pull from dockerhub
  TAG    tag to pull from dockerhub

OPTIONS
  -h, --help  Help command
```

_See code: [src/commands/pull.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.4.1/src/commands/pull.ts)_

## `docmir push PROVIDER IMAGE REPOURL TAG`

describe the command here

```
USAGE
  $ docmir push PROVIDER IMAGE REPOURL TAG

ARGUMENTS
  PROVIDER  (ecr|docker) The provider you will push images to
  IMAGE
  REPOURL
  TAG

OPTIONS
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/push.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.4.1/src/commands/push.ts)_

## `docmir registry PROVIDER COMMAND [REPONAME]`

describe the command here

```
USAGE
  $ docmir registry PROVIDER COMMAND [REPONAME]

OPTIONS
  -d, --docker=docker  flags the image pull from docker
  -f, --force
  -h, --help           show CLI help
```

_See code: [src/commands/registry.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.4.1/src/commands/registry.ts)_

## `docmir searchtags [IMAGENAME] [PROVIDER] [SERVER]`

describe the command here

```
USAGE
  $ docmir searchtags [IMAGENAME] [PROVIDER] [SERVER]

OPTIONS
  -h, --help         show CLI help
  -l, --limit=limit  Limit the number of tags to pull
```

_See code: [src/commands/searchtags.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.4.1/src/commands/searchtags.ts)_
<!-- commandsstop -->
