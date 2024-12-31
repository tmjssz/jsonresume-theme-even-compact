import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import Article from './article.js'
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
          ${awards.map(({ awarder, date, summary, title, breakBefore }, i) =>
            Article(
              title,
              html`${awarder && html`<div>Awarded by <strong>${awarder}</strong></div>`} ${date && DateTime(date)}`,
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
