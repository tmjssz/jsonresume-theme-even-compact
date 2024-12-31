import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import Article from './article.js'
import Duration from './duration.js'
import Link from './link.js'
import Section from './section.js'

/** @typedef {NonNullable<import('../schema.d.ts').ResumeSchema['work']>[number]} Work */
/** @typedef {Pick<Work, 'highlights' | 'location' | 'position' | 'startDate' | 'endDate' | 'summary'>} NestedWorkItem */
/** @typedef {Pick<Work, 'description' | 'name' | 'url'> & { items: NestedWorkItem[], breakBefore?: boolean }} NestedWork */

/**
 * @param {import('../schema.d.ts').ResumeSchema['work']} work
 * @returns {string | false}
 */
export default function Work(work = []) {
  const nestedWork = work.reduce((acc, { description, name, url, ...rest }) => {
    const prev = acc[acc.length - 1]
    if (prev && prev.name === name && prev.description === description && prev.url === url) prev.items.push(rest)
    else acc.push({ description, name, url, items: [rest] })
    return acc
  }, /** @type {NestedWork[]} */ ([]))

  const firstItem = work[0]

  return (
    work.length > 0 &&
    Section(
      'Experience',
      'work',
      html`
        <div class="stack">
          ${nestedWork.map(({ breakBefore, description, name, url, items = [] }, i) =>
            Article(
              items.length > 1 ? Link(url, name) : items[0].position,
              description && items.length > 1 ? description : '',
              html`
                <div ${items.length > 1 ? '' : 'class="single"'}>
                  <div class="timeline">
                    ${items.map(
                      ({ highlights = [], location, summary, startDate, endDate, position }) => html`
                        <div>
                          <div>
                            ${items.length > 1 && html`<h5>${position}</h5>`}
                            <span>
                              ${items.length <= 1 && html`<strong class="discrete-link">${Link(url, name)}</strong>`}
                              <span class="meta">
                                ${location && html`${items.length <= 1 ? '· ' : ''}${location}`}
                              </span>
                            </span>
                            <div class="meta">${startDate && html`<div>${Duration(startDate, endDate)}</div>`}</div>
                          </div>
                          ${summary && markdown(summary)}
                          ${highlights.length > 0 &&
                          html`
                            <ul>
                              ${highlights.map(highlight => html`<li>${markdown(highlight)}</li>`)}
                            </ul>
                          `}
                        </div>
                      `,
                    )}
                  </div>
                </div>
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
