/** 
 * -------------------------
 * Creating a Vue Instance
 * -------------------------
 * Every Vue application starts by creating a new Vue instance with the Vue function:
 */

 var vm = new Vue({
     // options
 })

 /** 
  * Although not strictly associated with the MVVM pattern, Vue’s design was partly inspired by it. As 
  * a convention, we often use the variable vm (short for ViewModel) to refer to our Vue instance.
  * 
  * When you create a Vue instance, you pass in an options object. The majority of this guide describes 
  * how you can use these options to create your desired behavior. For reference, you can also browse the 
  * full list of options in the API reference.
  * 
  * A Vue application consists of a root Vue instance created with new Vue, optionally organized into a 
  * tree of nested, reusable components.
  * 
  * -----------------
  * Data and Methods 
  * -----------------
  * When a Vue instance is created, it adds all the properties found in its data object to Vue’s 
  * reactivity system. When the values of those properties change, the view will “react”, updating to match 
  * the new values.
  */

// Our data object
var data = { a: 1 }

// The object is added to a Vue instance
var vm = new Vue({
    data: data
})

// Getting the property on the instance returns the one from the original data
vm.a == data.a  // => true

// Setting the property on the instance also affects the original data
vm.a = 2
data.a  // => 2

// ... and vice-versa 
data.a = 3
vm.a // => 3

/** 
 * When this data changes, the view will re-render. It should be noted that properties in data are only 
 * reactive if they existed when the instance was created. That means if you add a new property, like:
 */

vm.b = 'hi'

/** 
 * Then changes to b will not trigger any view updates. If you know you’ll need a property later, but 
 * it starts out empty or non-existent, you’ll need to set some initial value. For example:
 */

data: {
    newTodoText: '',
    visitCount: 0,
    hideCompletedTodos: false,
    todos: [],
    error: null
}

/** 
 * The only exception to this being the use of Object.freeze(), which prevents existing properties 
 * from being changed, which also means the reactivity system can’t track changes.
 */

var obj = {
    foo: 'bar'
}

Object.freeze(obj)

new Vue({
    el: '#app',
    data: obj
})

<div id="app">
    <p>{{ foo }}</p>
    <!-- this will no longer update 'foo' -->
    <button v-on:click="foo = 'baz'">Change it</button>
</div>

/** 
 * In addition to data properties, Vue instances expose a number of useful instance properties and 
 * methods. These are prefixed with $ to differentiate them from user-defined properties. 
 */

var data = { a: 1 }
var vm = new Vue({
    el: '#example',
    data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example')   // => true

// $watch is an instance method 
vm.$watch('a', function (newValue, oldValue) {
    // This callback will be called when 'vm.a' changes
})

/** 
 * -------------------------
 * Instance Lifecycle Hooks
 * -------------------------
 * Each Vue instance goes through a series of initialization steps when it’s created - for example, it 
 * needs to set up data observation, compile the template, mount the instance to the DOM, and update the 
 * DOM when data changes. Along the way, it also runs functions called lifecycle hooks, giving users the 
 * opportunity to add their own code at specific stages.
 * 
 * For example, the created hook can be used to run code after an instance is created:
 */

new Vue({
    data: {
        a: 1
    },
    created: function () {
        // this points to the vm instance
        console.log('a is: ' + this.a)
    }
})
// => "a is: 1"

/** 
 * There are also other hooks which will be called at different stages of the instance’s lifecycle, such 
 * as mounted, updated, and destroyed. All lifecycle hooks are called with their this context pointing to 
 * the Vue instance invoking it.
 * 
 * Don’t use arrow functions on an options property or callback, such as created: () => console.log(this.a) 
 * or vm.$watch('a', newValue => this.myMethod()). Since arrow functions are bound to the parent context, 
 * this will not be the Vue instance as you’d expect, often resulting in errors such as 
 * Uncaught TypeError: Cannot read property of undefined or Uncaught TypeError: this.myMethod is not a 
 * function.
 */