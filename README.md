# JoomlaJS

> A Grunt-init template for creating Joomla! CMS components.

[grunt-init]: http://gruntjs.com/project-scaffolding
[grunt]: http://gruntjs.com

## Installation
This application requires [grunt][] and [grunt-init][] to be installed.

Once grunt-init is installed, place this template in your `~/.grunt-init/`
directory. It's recommended that you use git to clone this template into that
directory, as follows:

```
git clone https://github.com/qawemlilo/joomlajs.git ~/.grunt-init/joomlajs
```

_(Windows users, see [the documentation][grunt-init] for the correct
destination directory path)_

## Usage

At the command-line, cd into an empty directory, run this command and follow
the prompts.

```
grunt-init joomlajs
```

Then install all dependencies.

```
npm install
```

To create a zipped file for your component run the command below.

```
grunt build
```

Your file will be saved in the directory named `build`.

_Note that this template will generate files in the current directory, so be
sure to change to a new directory first if you don't want to overwrite existing
files._
