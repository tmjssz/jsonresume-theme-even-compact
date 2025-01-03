import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import Article from './general/article.js'
import DateTime from './general/date-time.js'
import Link from './general/link.js'
import Section from './general/section.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['publications']} publications
 * @returns {string | false}
 */
export default function Publications(publications = []) {
  const firstItem = publications[0]
  return (
    publications.length > 0 &&
    Section(
      'Publications',
      'publications',
      html`
        <div class="stack">
          ${publications.map(({ name, publisher, releaseDate, summary, url, breakBefore }, i) =>
            Article(
              Link(url, name),
              html`<div>
                ${publisher && html`<div>Published by <strong>${publisher}</strong></div>`}
                ${releaseDate && DateTime(releaseDate)}
              </div>`,
              html`${summary && markdown(summary)}`,
              !!breakBefore && i > 0,
            ),
          )}
        </div>
      `,
      !!firstItem?.breakBefore,
    )
  )
}
