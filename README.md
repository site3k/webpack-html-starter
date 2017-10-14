# webpack-html-starter 

Quick POC of using Webpack as module-loader and automagically generating HTML.

## Features

1.  Modular JS/CSS/configs, modular everything
2.  CSS modules / local scope
3.  Automatic HTML generation via html-webpack-plugin
4.  ES6 in configs
5.  Live reload on webpack-dev-server


## Install and run

To clone from git bundle:

~~~
git clone https://github.com/site3k/webpack-html-starter.git
cd webpack-html-starter
~~~

NPM install from package.json:

~~~
npm install
~~~

Start the server (using webpack-dev-server) running *in-memory*:

~~~
npm start
~~~

Build static resources (using webpack) to folder **./build**:

~~~
npm run build
~~~

Code testing and linting (currently using eslint and stylelint):

~~~
npm run test
~~~
