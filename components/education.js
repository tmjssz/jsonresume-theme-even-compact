import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
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
      'education',
      html`
        <h3>Education</h3>
        <div class="stack">
          ${education.map(
            ({ area, courses = [], institution, startDate, endDate, studyType, url }) => html`
              <article>
                <header>
                  <h4>${Link(url, institution)}</h4>
                  <span>
                    <strong>${studyType}</strong>
                    <span class="meta">${area && html`· ${area}`}</span>
                  </span>
                  <div class="meta">${startDate && html`<div>${Duration(startDate, endDate)}</div>`}</div>
                </header>
                ${courses.length > 0 &&
                html`
                  <ul>
                    ${courses.map(course => html`<li>${markdown(course)}</li>`)}
                  </ul>
                `}
              </article>
            `,
          )}
        </div>
      `,
      !!firstItem?.breakBefore,
    )
  )
}
