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
docmir/0.1.5 darwin-x64 node-v16.2.0
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
* [`docmir push [FILE]`](#docmir-push-file)
* [`docmir registry PROVIDER COMMAND [REPONAME]`](#docmir-registry-provider-command-reponame)
* [`docmir searchtags [IMAGENAME]`](#docmir-searchtags-imagename)

## `docmir auth [PROVIDER]`

Working with Authentication for Dockerhub and registry

```
USAGE
  $ docmir auth [PROVIDER]

OPTIONS
  -h, --help                       show CLI help
  -p, --userPassword=userPassword  docker password
  -r, --repository=repository      Repository url
  -u, --userName=userName          docker username
```

_See code: [src/commands/auth.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.1.5/src/commands/auth.ts)_

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

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/pull.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.1.5/src/commands/pull.ts)_

## `docmir push [FILE]`

describe the command here

```
USAGE
  $ docmir push [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/push.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.1.5/src/commands/push.ts)_

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

_See code: [src/commands/registry.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.1.5/src/commands/registry.ts)_

## `docmir searchtags [IMAGENAME]`

describe the command here

```
USAGE
  $ docmir searchtags [IMAGENAME]

OPTIONS
  -h, --help         show CLI help
  -l, --limit=limit  Limit the number of tags to pull
```

_See code: [src/commands/searchtags.ts](https://github.com/CaliFOSS/docker-mirror/blob/v0.1.5/src/commands/searchtags.ts)_
<!-- commandsstop -->
