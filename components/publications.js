import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTime from './date-time.js'
import Link from './link.js'
import Section from './section.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['publications']} publications
 * @returns {string | false}
 */
export default function Publications(publications = []) {
  const firstItem = publications[0]
  return (
    publications.length > 0 &&
    Section(
      'publications',
      html`
        <h3>Publications</h3>
        <div class="stack">
          ${publications.map(
            ({ name, publisher, releaseDate, summary, url }) => html`
              <article>
                <header>
                  <h4>${Link(url, name)}</h4>
                  <div class="meta">
                    ${publisher && html`<div>Published by <strong>${publisher}</strong></div>`}
                    ${releaseDate && DateTime(releaseDate)}
                  </div>
                </header>
                ${summary && markdown(summary)}
              </article>
            `,
          )}
        </div>
      `,
      !!firstItem?.breakBefore,
    )
  )
}
