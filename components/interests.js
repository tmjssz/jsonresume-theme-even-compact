import { html } from '@rbardini/html'
import Section from './section.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['interests']} interests
 * @returns {string | false}
 */
export default function Interests(interests = []) {
  const firstItem = interests[0]
  return (
    interests.length > 0 &&
    Section(
      'interests',
      html`
        <h3>Interests</h3>
        <div class="grid-list">
          ${interests.map(
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
