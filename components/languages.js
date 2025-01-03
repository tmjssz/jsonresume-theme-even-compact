import { html } from '@rbardini/html'
import Section from './general/section.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['languages']} languages
 * @returns {string | false}
 */
export default function Languages(languages = []) {
  const firstItem = languages[0]
  return (
    languages.length > 0 &&
    Section(
      'Languages',
      'languages',
      html`
        <div class="grid-list">
          ${languages.map(
            ({ fluency, language }) => html`<div>${language && html`<h5>${language}</h5>`} ${fluency}</div>`,
          )}
        </div>
      `,
      !!firstItem?.breakBefore,
    )
  )
}
