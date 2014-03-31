# Carer's Allowance Prototype

A front-end prototype for the 'Apply for Carer's Allowance service on GOV.UK.

You can [view the prototype](http://thomasmooredwp.github.io/carers-allowance-prototype/) on GitHub.


## Dependencies

The prototype requires:

* [Ruby](https://www.ruby-lang.org/en/)
* the [Middleman](http://middlemanapp.com) static site generator
* the [Sass](http://sass-lang.com/) CSS extension language

It also uses:

* the [ERB](http://middlemanapp.com/basics/templates/) templating language
* the [GOV.UK Frontend Toolkit](https://github.com/alphagov/govuk_frontend_toolkit)

If you want to easily publish the prototype to GitHub pages you'll also need [Rake](http://rake.rubyforge.org/)

## Getting started

### 1. Clone this repository

Once you've cloned or forked the repository you'll need to initialise the GOV.UK Frontent Toolkit, which is included as a submodule. Run the following terminal commands from the project folder:

	git submodule init
	git submodule update


### 2. Preview the prototype on your local machine

Middleman comes with it's own development server. In the project folder, enter the following terminal command:

	middleman

This will start a local web server running at: `http://localhost:4567/`

You can create and edit files in the source folder and see the changes reflected on the preview web-server. Sass files will be automatically compiled as well.

### 3. Publish the static site

If you want to publish the prototype to GitHub Pages, there's a Rake task for that. Just type:

	rake publish

---

## Developing the prototype


### Storing and clearing form data

The prototype uses local storage to store and play back the data that users enter.

When you're testing with users, remember to clear the data before each new session. Use the 'Cancel this application' link on the 'Check your answers page'.


### Form groups

Form groups are stored as a partials in the 'partials' folder.

Some form groups are generic, like 'date' or 'text field'. You can pass variables into these partials to set things like id, label text and custom classes.

Other form groups are unique, like 'education' and therefore don't require variables.


### Writing form data to the screen

For each form-group partial there's an equivalent 'write' partial (with the suffix '-write'). These specify how the data should be written back to the screen (for example, on the 'check your answers' page).

If you look in the files you'll see how they work. The 'data-from' attribute should match the id variable passed in to the partial (actually, the 'name' attribute of the form field).


### Toggling visibility of elements

Some pages use the 'toggler' JavaScript to show form fields based on he users interaction with other form fields (usually radio buttons). Use 'data-show' and 'data-hide' attributes on the radio button to specify the elements you want to toggle.

You can pass 'yesToggle' and 'noToggle' variables into the 'yes-no' partial to active the same effect.


### Skipping questions

A tally of which questions have been answered or skipped is kept in local storage. This is used to calculate overall progress and to display the correct information on the 'check answers' page.

On some pages you might want to disable skipping, for example if the the users response triggers a branching of the flow.

Add 'noskip: true' to the YAML front matter of pages you want to disable skipping on.













