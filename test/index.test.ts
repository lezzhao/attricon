import { describe, expect, it } from 'vitest'
import { loadIconCss, transform } from '../src'

const code = `
    <i i-carbon-campsite />
    <i i-carbon-logo-github />
    <i i-material-symbols-10k />
`

const code1 = `const _hoisted_1 = /*#__PURE__*/_createElementVNode("i", { "i-carbon-campsite": "" }, null, -1 /* HOISTED */)\n`

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
    expect(await transform(code)).toMatchInlineSnapshot(`
      {
        "accessed": Set {
          "i-carbon-campsite",
          "i-carbon-logo-github",
          "i-material-symbols-10k",
        },
        "iconCss": "[i-carbon-campsite=""]{display:inline-block;width:1em;height:1em;background-color:currentColor;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100%100%;mask-size:100%100%;--svg:url("data:image/svg+xml,%3Csvgxmlns='http://www.w3.org/2000/svg'viewBox='003232'width='32'height='32'%3E%3Cpathfill='black'd='M27.56226L17.178.928l2.366-3.888L17.8284L167.005L14.174l-1.7081.04l2.3673.888L4.43826H2v2h28v-2ZM1610.85L25.2226H17v-8h-2v8H6.78Z'/%3E%3C/svg%3E");}[i-carbon-logo-github=""]{display:inline-block;width:1em;height:1em;background-color:currentColor;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100%100%;mask-size:100%100%;--svg:url("data:image/svg+xml,%3Csvgxmlns='http://www.w3.org/2000/svg'viewBox='003232'width='32'height='32'%3E%3Cpathfill='black'fill-rule='evenodd'd='M162a1414000-4.4327.28c.7.131-.31-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.73.7000-1.62-2.05c-1.27-.86.1-.85.1-.85a2.942.940012.141.45a330004.081.16a2.932.93001.88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.45.40011.44-3.76a55001.14-3.7s1.17-.383.851.43a13.313.300170c2.67-1.813.84-1.433.84-1.43a55001.143.7a5.45.40011.443.76c05.38-3.276.56-6.396.91a3.333.33001.952.59v3.84c0.46.25.811.67A1414000162'/%3E%3C/svg%3E");}[i-material-symbols-10k=""]{display:inline-block;width:1em;height:1em;background-color:currentColor;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100%100%;mask-size:100%100%;--svg:url("data:image/svg+xml,%3Csvgxmlns='http://www.w3.org/2000/svg'viewBox='002424'width='24'height='24'%3E%3Cpathfill='black'd='M615h1.5V9H5v1.5h1zm3.50H12q.4250.713-.288T1314v-4q0-.425-.288-.712T129H9.5q-.4250-.712.288T8.510v4q0.425.288.713T9.515m.5-1.5v-3h1.5v3zm41.5h1.5v-2.25L17.2515H19l-2.25-3L199h-1.75l-1.752.25V9H14zm-96q-.8250-1.412-.587T319V5q0-.825.588-1.412T53h14q.82501.413.588T215v14q0.825-.5871.413T1921z'/%3E%3C/svg%3E");}",
      }
    `)
    expect(await transform(code1)).toMatchInlineSnapshot(`
      {
        "accessed": Set {
          "i-carbon-campsite",
          "i-carbon-logo-github",
          "i-material-symbols-10k",
        },
        "iconCss": "[i-carbon-campsite=""]{display:inline-block;width:1em;height:1em;background-color:currentColor;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100%100%;mask-size:100%100%;--svg:url("data:image/svg+xml,%3Csvgxmlns='http://www.w3.org/2000/svg'viewBox='003232'width='32'height='32'%3E%3Cpathfill='black'd='M27.56226L17.178.928l2.366-3.888L17.8284L167.005L14.174l-1.7081.04l2.3673.888L4.43826H2v2h28v-2ZM1610.85L25.2226H17v-8h-2v8H6.78Z'/%3E%3C/svg%3E");}[i-carbon-logo-github=""]{display:inline-block;width:1em;height:1em;background-color:currentColor;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100%100%;mask-size:100%100%;--svg:url("data:image/svg+xml,%3Csvgxmlns='http://www.w3.org/2000/svg'viewBox='003232'width='32'height='32'%3E%3Cpathfill='black'fill-rule='evenodd'd='M162a1414000-4.4327.28c.7.131-.31-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.73.7000-1.62-2.05c-1.27-.86.1-.85.1-.85a2.942.940012.141.45a330004.081.16a2.932.93001.88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.45.40011.44-3.76a55001.14-3.7s1.17-.383.851.43a13.313.300170c2.67-1.813.84-1.433.84-1.43a55001.143.7a5.45.40011.443.76c05.38-3.276.56-6.396.91a3.333.33001.952.59v3.84c0.46.25.811.67A1414000162'/%3E%3C/svg%3E");}[i-material-symbols-10k=""]{display:inline-block;width:1em;height:1em;background-color:currentColor;-webkit-mask-image:var(--svg);mask-image:var(--svg);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100%100%;mask-size:100%100%;--svg:url("data:image/svg+xml,%3Csvgxmlns='http://www.w3.org/2000/svg'viewBox='002424'width='24'height='24'%3E%3Cpathfill='black'd='M615h1.5V9H5v1.5h1zm3.50H12q.4250.713-.288T1314v-4q0-.425-.288-.712T129H9.5q-.4250-.712.288T8.510v4q0.425.288.713T9.515m.5-1.5v-3h1.5v3zm41.5h1.5v-2.25L17.2515H19l-2.25-3L199h-1.75l-1.752.25V9H14zm-96q-.8250-1.412-.587T319V5q0-.825.588-1.412T53h14q.82501.413.588T215v14q0.825-.5871.413T1921z'/%3E%3C/svg%3E");}",
      }
    `)
  })
})
