import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import Section from './general/section.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['references']} references
 * @returns {string | false}
 */
export default function References(references = []) {
  const firstItem = references[0]
  return (
    references.length > 0 &&
    Section(
      'References',
      'references',
      html`
        <div class="stack">
          ${references.map(
            ({ name, reference }) => html`
              <blockquote>
                ${reference && markdown(reference)}
                ${name &&
                html`
                  <p>
                    <cite>${name}</cite>
                  </p>
                `}
              </blockquote>
            `,
          )}
        </div>
      `,
      !!firstItem?.breakBefore,
    )
  )
}
