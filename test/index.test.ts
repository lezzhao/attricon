import { describe, expect, it } from 'vitest'
import { IconGenerator, loadIconCss } from '../src'

const code = `
    <i i-carbon-campsite />
    <i i-carbon-logo-github />
    <i i-material-symbols-10k />
`

const code1 = `const _hoisted_1 = /*#__PURE__*/_createElementVNode("i", { "i-carbon-campsite": "" }, null, -1 /* HOISTED */)\n`

const code2 = '\n'
  + '<template>\n'
  + '  <div>\n'
  + '    Hello world  eee\n'
  + '    <i i-carbon-campsite />\n'
  + '    <i i-carbon-logo-github />\n'
  + '    <i i-material-symbols-10k />\n'
  + '    <div i-carbon-logo-github></div>\n'
  + '  </div>\n'
  + '</template>\n'
  + '\n'
  + '\n'
  + '<style>\n'
  + 'div{ \n'
  + '  color:red;\n'
  + '}\n'
  + '</style>'

describe('test', async () => {
  it('should work', async () => {
    expect(await loadIconCss('carbon-campsite')).toMatchInlineSnapshot(`
      "[carbon-campsite=""] {
        display: inline-block;
        width: 1em;
        height: 1em;
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpath fill='black' d='M27.562 26L17.17 8.928l2.366-3.888L17.828 4L16 7.005L14.17 4l-1.708 1.04l2.367 3.888L4.438 26H2v2h28v-2ZM16 10.85L25.22 26H17v-8h-2v8H6.78Z'/%3E%3C/svg%3E");
      }
      "
    `)
  })

  it('transform', async () => {
    const icon = new IconGenerator({ prefix: 'i-' })
    const icon1 = new IconGenerator({ prefix: 'i-' })
    const icon2 = new IconGenerator({ prefix: 'i-' })
    expect(await icon.scan(code, true)).toMatchInlineSnapshot(`"[i-carbon-campsite=""] {  display: inline-block;  width: 1em;  height: 1em;  background-color: currentColor;  -webkit-mask-image: var(--svg);  mask-image: var(--svg);  -webkit-mask-repeat: no-repeat;  mask-repeat: no-repeat;  -webkit-mask-size: 100% 100%;  mask-size: 100% 100%;  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpath fill='black' d='M27.562 26L17.17 8.928l2.366-3.888L17.828 4L16 7.005L14.17 4l-1.708 1.04l2.367 3.888L4.438 26H2v2h28v-2ZM16 10.85L25.22 26H17v-8h-2v8H6.78Z'/%3E%3C/svg%3E");}[i-carbon-logo-github=""] {  display: inline-block;  width: 1em;  height: 1em;  background-color: currentColor;  -webkit-mask-image: var(--svg);  mask-image: var(--svg);  -webkit-mask-repeat: no-repeat;  mask-repeat: no-repeat;  -webkit-mask-size: 100% 100%;  mask-size: 100% 100%;  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpath fill='black' fill-rule='evenodd' d='M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.7 3.7 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2'/%3E%3C/svg%3E");}[i-material-symbols-10k=""] {  display: inline-block;  width: 1em;  height: 1em;  background-color: currentColor;  -webkit-mask-image: var(--svg);  mask-image: var(--svg);  -webkit-mask-repeat: no-repeat;  mask-repeat: no-repeat;  -webkit-mask-size: 100% 100%;  mask-size: 100% 100%;  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M6 15h1.5V9H5v1.5h1zm3.5 0H12q.425 0 .713-.288T13 14v-4q0-.425-.288-.712T12 9H9.5q-.425 0-.712.288T8.5 10v4q0 .425.288.713T9.5 15m.5-1.5v-3h1.5v3zm4 1.5h1.5v-2.25L17.25 15H19l-2.25-3L19 9h-1.75l-1.75 2.25V9H14zm-9 6q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z'/%3E%3C/svg%3E");}"`)
    expect(await icon1.scan(code1, true)).toMatchInlineSnapshot(`"[i-carbon-campsite=""] {  display: inline-block;  width: 1em;  height: 1em;  background-color: currentColor;  -webkit-mask-image: var(--svg);  mask-image: var(--svg);  -webkit-mask-repeat: no-repeat;  mask-repeat: no-repeat;  -webkit-mask-size: 100% 100%;  mask-size: 100% 100%;  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpath fill='black' d='M27.562 26L17.17 8.928l2.366-3.888L17.828 4L16 7.005L14.17 4l-1.708 1.04l2.367 3.888L4.438 26H2v2h28v-2ZM16 10.85L25.22 26H17v-8h-2v8H6.78Z'/%3E%3C/svg%3E");}"`)
    expect(await icon2.scan(code2, true)).toMatchInlineSnapshot(`"[i-carbon-campsite=""] {  display: inline-block;  width: 1em;  height: 1em;  background-color: currentColor;  -webkit-mask-image: var(--svg);  mask-image: var(--svg);  -webkit-mask-repeat: no-repeat;  mask-repeat: no-repeat;  -webkit-mask-size: 100% 100%;  mask-size: 100% 100%;  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpath fill='black' d='M27.562 26L17.17 8.928l2.366-3.888L17.828 4L16 7.005L14.17 4l-1.708 1.04l2.367 3.888L4.438 26H2v2h28v-2ZM16 10.85L25.22 26H17v-8h-2v8H6.78Z'/%3E%3C/svg%3E");}[i-carbon-logo-github=""] {  display: inline-block;  width: 1em;  height: 1em;  background-color: currentColor;  -webkit-mask-image: var(--svg);  mask-image: var(--svg);  -webkit-mask-repeat: no-repeat;  mask-repeat: no-repeat;  -webkit-mask-size: 100% 100%;  mask-size: 100% 100%;  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32'%3E%3Cpath fill='black' fill-rule='evenodd' d='M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.7 3.7 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2'/%3E%3C/svg%3E");}[i-material-symbols-10k=""] {  display: inline-block;  width: 1em;  height: 1em;  background-color: currentColor;  -webkit-mask-image: var(--svg);  mask-image: var(--svg);  -webkit-mask-repeat: no-repeat;  mask-repeat: no-repeat;  -webkit-mask-size: 100% 100%;  mask-size: 100% 100%;  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='black' d='M6 15h1.5V9H5v1.5h1zm3.5 0H12q.425 0 .713-.288T13 14v-4q0-.425-.288-.712T12 9H9.5q-.425 0-.712.288T8.5 10v4q0 .425.288.713T9.5 15m.5-1.5v-3h1.5v3zm4 1.5h1.5v-2.25L17.25 15H19l-2.25-3L19 9h-1.75l-1.75 2.25V9H14zm-9 6q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z'/%3E%3C/svg%3E");}"`)
  })
})
