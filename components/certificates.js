import { html } from '@rbardini/html'
import DateTime from './date-time.js'
import Link from './link.js'
import Section from './section.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema['certificates']} certificates
 * @returns {string | false}
 */
export default function Certificates(certificates = []) {
  const firstItem = certificates[0]
  return (
    certificates.length > 0 &&
    Section(
      'certificates',
      html`
        <h3>Certificates</h3>
        <div class="stack">
          ${certificates.map(
            ({ date, issuer, name, url }) => html`
              <article>
                <header>
                  <h4>${Link(url, name)}</h4>
                  <div class="meta">
                    ${issuer && html`<div>Issued by <strong>${issuer}</strong></div>`} ${date && DateTime(date)}
                  </div>
                </header>
              </article>
            `,
          )}
        </div>
      `,
      !!firstItem?.breakBefore,
    )
  )
}
