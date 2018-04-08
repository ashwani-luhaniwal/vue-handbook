<!-- 
    ######################
    Binding Inline Styles
    ######################

    ##############
    Object Syntax
    ##############
    The object syntax for v-bind:style is pretty straightforward - it looks almost like CSS, except it’s 
    a JavaScript object. You can use either camelCase or kebab-case (use quotes with kebab-case) for the 
    CSS property names:
-->

<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
    activeColor: 'red',
    fontSize: 30
}

// It is often a good idea to bind to a style object directly so that the template is cleaner:

<div v-bind:style="styleObject"></div>

data: {
    styleObject: {
        color: 'red',
        fontSize: '13px'
    }
}

<!-- 
    Again, the object syntax is often used in conjunction with computed properties that return objects.

    ##############
    Array Syntax
    #############
    The array syntax for v-bind:style allows you to apply multiple style objects to the same element:
-->

<div v-bind:style="[baseStyles, overridingStyles]"></div>

<!-- 
    ###############
    Auto-prefixing
    ###############
    When you use a CSS property that requires vendor prefixes in v-bind:style, for example transform, 
    Vue will automatically detect and add appropriate prefixes to the applied styles.

    ################
    Multiple Values
    ################
    Starting in 2.3.0+ you can provide an array of multiple (prefixed) values to a style property, 
    for example:
-->

<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>

<!-- 
    This will only render the last value in the array which the browser supports. In this example, it 
    will render display: flex for browsers that support the unprefixed version of flexbox.
-->