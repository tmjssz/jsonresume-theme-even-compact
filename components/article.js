import { html } from '@rbardini/html'

export default function Article(title = '', subtitle = '', children = '', breakBefore = false) {
  return (
    children.length > 0 &&
    html`
      <article ${breakBefore ? 'class="page-break-before"' : ''}>
        <header>
          <h4>${title}</h4>
          ${subtitle.length > 0 ? html`<div class="meta">${subtitle}</div>` : ''}
        </header>
        ${children}
      </article>
    `
  )
}
