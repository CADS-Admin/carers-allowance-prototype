# Carer's Allowance Prototype

A front-end prototype for the 'Apply for Carer's Allowance service on GOV.UK.


## Dependencies

The prototype uses:

* [Ruby](https://www.ruby-lang.org/en/)
* the [Middleman](http://middlemanapp.com) static site generator
* the [Sass](http://sass-lang.com/) CSS extension language
* the [ERB](http://middlemanapp.com/basics/templates/) templateing language
* the [GOV.UK Frontend Toolkit](https://github.com/alphagov/govuk_frontend_toolkit)

## Getting started

### 1. Clone this repository

Once you've cloned the repository you'll need to initialise the GOV.UK Frontent Toolkit, which is included as a submodule.

Run the following terminal commands from the project folder:

	git submodule init
	git submodule update


### 2. Preview the prototype on your local machine

Middleman comes with it's own development server. In the project folder, enter the following terminal command:

	middleman

This will start a local web server running at: `http://localhost:4567/`

You can create and edit files in the source folder and see the changes reflected on the preview web-server. Sass files will be automatically compiled as well.

## 3. Building the static site

If you want to publish the prototype on the internet you'll need to build it first. Type:

	middleman build

Everything will be compiled into the `build` folder.

