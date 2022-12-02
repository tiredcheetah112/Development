# Development

### Link to Deployed Website
If you used the stencil code, this is `https://tiredcheetah112.github.io/Development`

### Goal and Value of the Application
The goal of this application was to make a website that supported filtering and sorting with React. 

### Usability Principles Considered

I designed the website similar to the way that the bakery site was designed. I kept it really simple
There are a few designe choices for the website that I decided to make. First and foremost, you can add only one item.
This is because people tend to only get only one shoe, so there was no reason for me to enable the feature of adding multiple items to
the cart. The next choice that I made was to make the boxes that you check uncheckable unless you decide to check another box.
For example, if someone were to select Adidas, they cannot unselect it, they can either choose another brand within that category (such as Nike) or they can reset. They can however choose multiple fitlers at the same time. So they are able to select Adidas shoes that are under 100 dollars. They are also able to have them sorted from highest to lowest and lowest to highest. The design is pretty intuitive.
Of course, you can go back to the default by pressing the reset button, which takes you back to the structure of the original website.


### Organization of Components

There are two additional files outside of the app.js file, and that is the checkbox file and the shoe item file. The checkbox file is for creating a checkbox (these are used for filtering and sorting), and the shoe item file is for displaying the shoe onto the screen (similar to the way that it is done in the original code and the lab). I also have all of the event handlers in the beginning of the app file (before the return function), and I also have the helper functions before the return function as well. 

### How Data is Passed Down Through Components

Most of the data are passed through the event handlers and the helper functions that I made. To handle the displaying of the list of items
I used the useState variable on the data which was for displaying the items. So for the most part, the data is being passed through the useState functions and the additional helper functions that assist with the functionality for the filtering and the sorting.

### How the User Triggers State Changes

The user could trigger the state changes in multiple ways. The first is through filtering. The user could select ONLY ONE item from each category and once they select the item, they are unable to deselect it. They can only choose another item from the same category which deselects tha previous checked item and selects the new item. The second way that the user can trigger a state change is through sorting. Again, since both of the options are not able to coexist (high to low and low to high), they are mutually exclusive so only one of the sorting items can be selected at a time. The sorting can be selected with the filters. The next way that the user can trigger a state change is through adding and removing items from the cart. Doing this is going to cause the total price to change and it will also change the amount of items that are displayed on the cart. The last feature that user has to trigger a change is the reset button, which is used to completely restore the data, cart, ordering, and filters to the way that it originally was. 