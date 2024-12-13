# dumi-plugin-preset-html

dumi Html tech stack support

## Features

- [x] Supports HTML processing
- [x] Inline demo and external demo support
- [x] Support CodeSandbox and StackBlitz preview
- [x] Webpack processing
- [x] Support live demo

## Install

```
npm i dumi-plugin-preset-html --save
```

## Config

```
// .dumirc.ts
export default {
  presets: ['dumi-plugin-preset-html'],
};
```

## Example

write the following code in index.md, which can execute HTML code, including JavaScript, css.

### basic demo:

````
```html

<div>Hello, I`m dumi plugin for preset html!</div>

```

````

### execute javascript and style demo:


````
```html

<div class="my-class">Hello, I can execute style and javasript</div>

<script>
    console.log('hello world!')
</script>

<style>
    .my-class{
        color: red;
    }
</style>

```
````

### external demo:
you can reference external HTML file in .md


```

<code src="./demo.html">external demo</code>

```
