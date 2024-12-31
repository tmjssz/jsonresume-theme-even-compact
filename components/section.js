import { html } from '@rbardini/html'

export default function Section(title = '', id = '', children = '', breakBefore = false) {
  return (
    children.length > 0 &&
    html`
      <section ${id.length > 0 ? 'id="${id}"' : ''} ${breakBefore ? 'class="page-break-before"' : ''}>
        <h3>${title}</h3>
        ${children}
      </section>
    `
  )
}
