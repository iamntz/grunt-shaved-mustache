# grunt-shaved-mustache

> Make mustache templates re-usable in JS

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-shaved-mustache --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-shaved-mustache');
```

## The "shaved_mustache" task

#### TODO
- add some docs

Super basic usage:

```
shaved_mustache: {
  product: {
    options: {
      namespace: 'namespace',
      defaultName: function(filename) {
        filename = filename.replace( /(views\/|\.mustache)/gi , '' );

        return filename;
      }
    },
    files:{
      "assets/dist/javascripts/templates.js" : [
        'views/product/product_archive_item.mustache',
        'views/product/popup_content.mustache',
        'views/product/popup.mustache'
      ],
    }
  }
},

```
