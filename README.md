# Zondicons (SVG Sprite)

Zondicons processed using SVGO and combined for use as an SVG sprite

What's Zondicons?

> A set of free premium SVG icons for you to use on your digital products.
>
> -- https://www.zondicons.com/

by [Steve Schoger](https://dribbble.com/steveschoger)

Creative Commons Licensed.

## Processed?

This is a Node.JS library that processes the original
Zondicons using [SVGO](https://www.npmjs.com/package/svgo), then converts them all into a single
SVG for use as SVG Symbols.

## Usage

Use like this:

    <svg class="fill-current w-8 h-8 text-gray-500" xmlns="http://www.w3.org/2000/svg">
        <use href="/assets/sprite.svg#ticket"></use>
    </svg>
        
(NB: added [TailWindCSS](https://tailwindcss.com/) classes for styling)

## Icons

[View the icons](https://www.zondicons.com/icons.html)
