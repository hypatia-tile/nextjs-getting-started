import { createElement } from 'react'
import type { DetailedReactHTMLElement, InputHTMLAttributes } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const myElement: DetailedReactHTMLElement<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = createElement(
  "input",
  null,
);

const html: string = renderToStaticMarkup(myElement);
console.log(html);
