import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import Article from './article.js'
import Duration from './duration.js'
import Link from './link.js'
import Section from './section.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['education']} education
 * @returns {string | false}
 */
export default function Education(education = []) {
  const firstItem = education[0]
  return (
    education.length > 0 &&
    Section(
      'Education',
      'education',
      html`
        <div class="stack">
          ${education.map(({ area, courses = [], institution, startDate, endDate, studyType, url, breakBefore }, i) =>
            Article(
              Link(url, institution),
              html`<span>
                  <strong>${studyType}</strong>
                  <span>${area && html`· ${area}`}</span>
                </span>
                <div>${startDate && html`<div>${Duration(startDate, endDate)}</div>`}</div>`,
              html`
                ${courses.length > 0 &&
                html`
                  <ul>
                    ${courses.map(course => html`<li>${markdown(course)}</li>`)}
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
