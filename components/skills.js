import { html } from '@rbardini/html'
import Section from './section.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['skills']} skills
 * @returns {string | false}
 */
export default function Skills(skills = []) {
  const firstItem = skills[0]
  return (
    skills.length > 0 &&
    Section(
      'Skills',
      'skills',
      html`
        <div class="grid-list">
          ${skills.map(
            ({ keywords = [], name }) => html`
              <div>
                ${name && html`<h5>${name}</h5>`}
                ${keywords.length > 0 &&
                html`
                  <ul class="tag-list">
                    ${keywords.map(keyword => html`<li>${keyword}</li>`)}
                  </ul>
                `}
              </div>
            `,
          )}
        </div>
      `,
      !!firstItem?.breakBefore,
    )
  )
}
