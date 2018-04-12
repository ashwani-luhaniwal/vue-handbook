<template>
  
</template>

<!-- 
    #####################
    v-for with an Object
    #####################
    You can also use v-for to iterate through the properties of an object.
-->

<ul id="v-for-object" class="demo">
    <li v-for="value in object">
        {{ value }}
    </li>
</ul>

new Vue({
    el: '#v-for-object',
    data: {
        object: {
            firstName: 'Ashwani',
            lastName: 'Luhaniwal',
            age: 28
        }
    }
})

<!-- 
    You can also provide a second argument for the key:
-->
<div v-for="(value, key) in object">
    {{ key }}: {{ value }}
</div>

<!-- 
    And another for the index: 
-->

<div v-for="(value, key, index) in object">
    {{ index }}, {{ key }}: {{ value }}
</div>

<!-- 
    When iterating over an object, the order is based on the key enumeration order of Object.keys(), 
    which is not guaranteed to be consistent across JavaScript engine implementations.

    ####
    key
    ####
    When Vue is updating a list of elements rendered with v-for, by default it uses an 
    “in-place patch” strategy. If the order of the data items has changed, instead of moving the 
    DOM elements to match the order of the items, Vue will patch each element in-place and make 
    sure it reflects what should be rendered at that particular index. This is similar to the 
    behavior of track-by="$index" in Vue 1.x.

    This default mode is efficient, but only suitable when your list render output does not rely 
    on child component state or temporary DOM state (e.g. form input values).
    
    To give Vue a hint so that it can track each node’s identity, and thus reuse and reorder 
    existing elements, you need to provide a unique key attribute for each item. An ideal value 
    for key would be the unique id of each item. This special attribute is a rough equivalent to 
    track-by in 1.x, but it works like an attribute, so you need to use v-bind to bind it to 
    dynamic values (using shorthand here):
-->

<div v-for="item in items" :key="item.id">
    <!-- content -->
</div> 

<!-- 
    It is recommended to provide a key with v-for whenever possible, unless the iterated DOM 
    content is simple, or you are intentionally relying on the default behavior for performance 
    gains.
    
    Since it’s a generic mechanism for Vue to identify nodes, the key also has other uses that 
    are not specifically tied to v-for.

    ###################
    v-for with a Range
    ###################
    v-for can also take an integer. In this case it will repeat the template that many times.
-->

<div>
    <span v-for="n in 10">{{ n }}</span>
</div>

<!-- 
    ######################
    v-for on a <template>
    ######################
    Similar to template v-if, you can also use a <template> tag with v-for to render a block of 
    multiple elements. For example:
-->

<ul>
    <template v-for="item in items">
        <li>{{ item.msg }}</li>
        <li class="divider"></li>
    </template>
</ul>

<!-- 
    ################
    v-for with v-if
    ################
    When they exist on the same node, v-for has a higher priority than v-if. That means the v-if 
    will be run on each iteration of the loop separately. This can be useful when you want to 
    render nodes for only some items, like below:
-->

<li v-for="todo in todos" v-if="!todo.isComplete">
    {{ todo }}
</li>

<!-- 
    The above only renders the todos that are not complete.
    
    If instead, your intent is to conditionally skip execution of the loop, you can place the 
    v-if on a wrapper element (or <template>). For example:
-->

<ul v-if="todos.length">
    <li v-for="todo in todos">
        {{ todo }}
    </li>
</ul>
<p v-else>No todos left!</p>

<!-- 
    #######################
    v-for with a Component
    #######################
    You can directly use v-for on a custom component, like any normal element:
-->

<my-component v-for="item in items" :key="item.id"></my-component>

<!-- 
    However, this won’t automatically pass any data to the component, because components have 
    isolated scopes of their own. In order to pass the iterated data into the component, we 
    should also use props:
-->

<my-component
    v-for="(item, index) in items"
    v-bind:item="item"
    v-bind:index="index"
    v-bind:key="item.id">
</my-component>

<!-- 
    The reason for not automatically injecting item into the component is because that makes 
    the component tightly coupled to how v-for works. Being explicit about where its data comes 
    from makes the component reusable in other situations.
-->
