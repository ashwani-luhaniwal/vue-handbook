/**
 * --------------
 * What is Vue ?
 * --------------
 * Vue (pronounced /vjuː/, like view) is a progressive framework for building user interfaces. Unlike other 
 * monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable. The core library 
 * is focused on the view layer only, and is easy to pick up and integrate with other libraries or existing 
 * projects. On the other hand, Vue is also perfectly capable of powering sophisticated Single-Page Applications 
 * when used in combination with modern tooling and supporting libraries.
 * 
 * ----------------------
 * Declarative Rendering
 * ----------------------
 * At the core of Vue.js is a system that enables us to declaratively render data to the DOM using 
 * straightforward template syntax:
 */
<div id="app">
    {{ message }}
</div>

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})

/**
 * We have already created our very first Vue app! This looks pretty similar to rendering a string template, 
 * but Vue has done a lot of work under the hood. The data and the DOM are now linked, and everything is 
 * now reactive. How do we know? Open your browser’s JavaScript console (right now, on this page) and set 
 * app.message to a different value. You should see the rendered example above update accordingly.
 * 
 * In addition to text interpolation, we can also bind element attributes like this:
 */
<div id="app-2">
    <span v-bind:title="message">
        Hover your mouse over me for a few seconds
        to see my dynamically bound title!
    </span>
</div>

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'You loaded this page on ' + new Date().toLocaleString()
    }
})

/**
 * Here we are encountering something new. The v-bind attribute you are seeing is called a directive. 
 * Directives are prefixed with v- to indicate that they are special attributes provided by Vue, and as 
 * you may have guessed, they apply special reactive behavior to the rendered DOM. Here, it is basically 
 * saying “keep this element’s title attribute up-to-date with the message property on the Vue instance.”
 * 
 * ------------------------
 * Conditionals and Loops
 * ------------------------
 * It’s easy to toggle the presence of an element, too:
 */
 <div id="app-3">
    <span v-if="seen">Now you see me</span>
</div>

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
})

/**
 * Go ahead and enter app3.seen = false in the console. You should see the message disappear.
 *
 * This example demonstrates that we can bind data to not only text and attributes, but also the structure 
 * of the DOM. Moreover, Vue also provides a powerful transition effect system that can automatically 
 * apply transition effects when elements are inserted/updated/removed by Vue.
 * 
 * There are quite a few other directives, each with its own special functionality. For example, the 
 * v-for directive can be used for displaying a list of items using the data from an Array:
 */
 <div id="app-4">
    <ol>
        <li v-for="todo in todos">
            {{ todo.text }}
        </li>
    </ol>
</div>

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue' },
            { text: 'Build something awesome' }
        ]
    }
})

/** 
 * In the console, enter app4.todos.push({ text: 'New item' }). You should see a new item appended to 
 * the list.
 * 
 * --------------------
 * Handling User Input
 * --------------------
 * To let users interact with your app, we can use the v-on directive to attach event listeners that 
 * invoke methods on our Vue instances:
 */
 <div id="app-5">
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">Reverse Message</button>
</div>

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'Hello Vue.js!'
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})

/**
 * Note that in this method we update the state of our app without touching the DOM - all DOM 
 * manipulations are handled by Vue, and the code you write is focused on the underlying logic.
 * 
 * Vue also provides the v-model directive that makes two-way binding between form input and app 
 * state a breeze:
 */
 <div id="app-6">
    <p>{{ message }}</p>
    <input v-model="message">
</div>

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue!'
    }
})

/** 
 * --------------------------
 * Composing with Components 
 * --------------------------
 * The component system is another important concept in Vue, because it’s an abstraction that allows us 
 * to build large-scale applications composed of small, self-contained, and often reusable components. 
 * If we think about it, almost any type of application interface can be abstracted into a tree of 
 * components:
 * 
 * In Vue, a component is essentially a Vue instance with pre-defined options. Registering a component in 
 * Vue is straightforward:
 */

// Define a new component called todo-item
Vue.component('todo-item', {
    template: '<li>This is a todo</li>'
})

/**
 * Now you can compose it in another component’s template:
 */

<ol>
    <!-- Create an instance of the todo-item component -->
    <todo-item></todo-item>
</ol>

/** 
 * But this would render the same text for every todo, which is not super interesting. We should be able 
 * to pass data from the parent scope into child components. Let’s modify the component definition to 
 * make it accept a prop:
 */

Vue.component('todo-item', {
    // The todo-item component now accepts actions a 
    // "prop", which is like a custom attribute. 
    // This prop is called todo. 
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

/** 
 * Now we can pass the todo into each repeated component using v-bind:
 */

<div id="app-7">
    <ol>
        <!--
            Now we provide each todo-item with the todo object it's representing, so that its 
            content can be dynamic. We also need to provide each component with a "key", which
            will be explained later. 
        -->
        <todo-item 
            v-for="item in groceryList"
            v-bind:todo="item"
            v-bind:key="item.id">
        </todo-item>
    </ol>
</div>

Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are supported to eat' }
        ]
    }
})

/** 
 * This is a contrived example, but we have managed to separate our app into two smaller units, and the 
 * child is reasonably well-decoupled from the parent via the props interface. We can now further 
 * improve our <todo-item> component with more complex template and logic without affecting the parent app.
 * 
 * In a large application, it is necessary to divide the whole app into components to make development 
 * manageable. We will talk a lot more about components later in the guide, but here’s an (imaginary) 
 * example of what an app’s template might look like with components:
 */

<div id="app">
    <app-nav></app-nav>
    <app-view>
        <app-sidebar></app-sidebar>
        <app-content></app-content>
    </app-view>
</div>

/** 
 * ----------------------------
 * Relation to Custom Elements
 * ----------------------------
 * You may have noticed that Vue components are very similar to Custom Elements, which are part of the 
 * Web Components Spec. That’s because Vue’s component syntax is loosely modeled after the spec. For 
 * example, Vue components implement the Slot API and the is special attribute. However, there are a 
 * few key differences:
 * 
 * 1. The Web Components Spec is still in draft status, and is not natively implemented in every browser. 
 * In comparison, Vue components don’t require any polyfills and work consistently in all supported browsers 
 * (IE9 and above). When needed, Vue components can also be wrapped inside a native custom element.
 * 
 * 2. Vue components provide important features that are not available in plain custom elements, most 
 * notably cross-component data flow, custom event communication and build tool integrations.
 */