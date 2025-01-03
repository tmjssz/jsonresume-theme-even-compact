import { html } from '@rbardini/html'
import markdown from '../../utils/markdown.js'
import Article from '../general/article.js'
import Duration from '../general/duration.js'
import Link from '../general/link.js'
import Section from '../general/section.js'

/**
 * @param {import('../../schema.d.ts').ResumeSchema['volunteer']} volunteer
 * @returns {string | false}
 */
export default function Volunteer(volunteer = []) {
  const firstItem = volunteer[0]
  return (
    volunteer.length > 0 &&
    Section(
      'Volunteer',
      'volunteer',
      html`
        <div class="stack">
          ${volunteer.map(
            ({ highlights = [], organization, position, startDate, endDate, summary, url, breakBefore }, i) =>
              Article(
                Link(url, organization),
                html`<div>
                  <strong>${position}</strong>
                  ${startDate && html`<div>${Duration(startDate, endDate)}</div>`}
                </div>`,

                html`
                  ${summary && markdown(summary)}
                  ${highlights.length > 0 &&
                  html`
                    <ul>
                      ${highlights.map(highlight => html`<li>${markdown(highlight)}</li>`)}
                    </ul>
                  `}
                `,
                !!breakBefore && i > 0,
              ),
          )}
        </div>
      `,
      !!firstItem?.breakBefore,
    )
  )
}
