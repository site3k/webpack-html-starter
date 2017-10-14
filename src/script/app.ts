import * as _ from 'lodash';
import $ = require("jquery");

function Greeter(greeting: string) {
    this.greeting = greeting;
}

Greeter.prototype.greet = function() {
    return "Hello, " + this.greeting;
}
 console.log("test script");