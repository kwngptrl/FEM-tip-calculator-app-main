# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

This challenge includes elements of Frontend Mentor's [Interactive Rating Component.](https://www.frontendmentor.io/challenges/interactive-rating-component-koxpeBUmI/hub)

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JS

### What I learned

When I first downloaded the starter files and looked at it I was wondering why there's no submit button on this. This is essentially a form and there should be a submit button. But as it turns out, this is like some calculator apps out there where it is based on event listeners. So, thinking about it I immediately recognized that a previous challenge can be included here and that was the Interactive Rating Component. It would be used where the user would select the tip in percent, but what about 'custom'?

This is where I fell into the JS rabbit hole. The HTML and CSS were largely done in two days. The JS on the other hand had me reading about IIFEs, closures, nested event listeners (which turned out to be bad practice), roving tabindexes, among other things. What I wanted to happen once I entered the group of radiobuttons was to be able to use the arrow keys to navigate inside it, and then when I get to the last radiobutton named 'custom' it turns into an `<input type='text' />` field.

Originally, I attached event listeners to all elements of the form. Later on, I read about event delegation and decided to use that. There were a lot of tiny little things that had to be tracked like the tabindex, changing the radiobutton checked state from true to false and back, tracking where the cursor/caret was in order for keyboard navigation to work within the radiobutton group, transferring any value there to the radiobutton, and dispatching an event from it when the focus changes to another element to update the result in the result container. Then, if the user pressed the 'reset' button all states, values, and error messages had to be reset or return to default.

Now that I'm done with this I'm thinking I 'overthinked' too much. Maybe I could've just used 5 radiobuttons and a standard `<input type='text' />`. There would still be the issue of tabindex regardless though.

For computing the result and displaying to the result container, I used the following code so that it wouldn't display `NaN` or `Infinity`.
```js
tipAmount.innerText = `\$${(isFinite(tipAmountPerPerson)) ? tipAmountPerPerson.toFixed(2): '0.00'}`;
totalAmount.innerText = `\$${(isFinite(total)) ? total.toFixed(2) : '0.00'}`;
```
It would just display $0.00, the error message would be displayed closest to the input field for bill and/or number of people. For the 'custom' input field within the radiobutton group, entering invalid values would cause the background color of the input field to turn red.
```js
let tip = Number(inputCustom.value);
    if (tip < 0 || tip > 100 || isNaN(tip)) {
            inputCustom.classList.add("invalid");
        } else {
            inputCustom.classList.remove("invalid");
        }
```
```css
.custom-tip.invalid {
    background-color: red;
}
```

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
const proudOfThisFunc = () => {
  console.log('🎉')
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
