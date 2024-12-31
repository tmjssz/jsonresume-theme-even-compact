import { html } from '@rbardini/html'
import Article from './article.js'
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
      'Certificates',
      'certificates',
      html`
        <div class="stack">
          ${certificates.map(({ date, issuer, name, url, breakBefore }, i) =>
            Article(
              Link(url, name),
              `${issuer && html`<div>Issued by <strong>${issuer}</strong></div>`} ${date && DateTime(date)}`,
              '',
              !!breakBefore && i > 0,
            ),
          )}
        </div>
      `,
      !!firstItem?.breakBefore,
    )
  )
}
