import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import DateTime from './date-time.js'
import Section from './section.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['awards']} awards
 * @returns {string | false}
 */
export default function Awards(awards = []) {
  const firstItem = awards[0]
  return (
    awards.length > 0 &&
    Section(
      'Awards',
      'awards',
      html`
        <div class="stack">
          ${awards.map(
            ({ awarder, date, summary, title }) => html`
              <article>
                <header>
                  <h4>${title}</h4>
                  <div class="meta">
                    ${awarder && html`<div>Awarded by <strong>${awarder}</strong></div>`} ${date && DateTime(date)}
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
