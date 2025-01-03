import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import Article from './general/article.js'
import Duration from './general/duration.js'
import Link from './general/link.js'
import Section from './general/section.js'

/** @typedef {NonNullable<import('../schema.d.ts').ResumeSchema['work']>[number]} Work */
/** @typedef {Pick<Work, 'highlights' | 'location' | 'position' | 'startDate' | 'endDate' | 'summary'>} NestedWorkItem */
/** @typedef {Pick<Work, 'description' | 'name' | 'url'> & { items: NestedWorkItem[], breakBefore?: boolean }} NestedWork */

/**
 * @param {NestedWork} nestedWork
 * @returns {string | false}
 */
export function NestedWork({ breakBefore, description, name, url, items = [] }) {
  if (items.length === 0) return false

  const hasSingleItem = items.length === 1
  const firstItem = items[0]

  const title = hasSingleItem ? firstItem.position : Link(url, name)
  const subtitle = hasSingleItem
    ? html`
        <span>
          <strong class="discrete-link color-primary">${Link(url, name)}</strong>
          <span class="meta"> ${firstItem.location && html`· ${firstItem.location}`} </span>
        </span>
        <div>${firstItem.startDate && Duration(firstItem.startDate, firstItem.endDate)}</div>
      `
    : description

  return Article(
    title,
    subtitle,
    html`
      <div${hasSingleItem ? ' class="single"' : ''}>
        <div class="timeline">
          ${items.map(
            ({ highlights = [], location, summary, startDate, endDate, position }) => html`
              <div>
                <div>
                  ${!hasSingleItem && html`<h5>${position}</h5>`}
                  <span>
                    <span class="meta">${location && !hasSingleItem ? location : ''} </span>
                  </span>
                  <div class="meta">
                    ${startDate && !hasSingleItem && html`<div>${Duration(startDate, endDate)}</div>`}
                  </div>
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
    breakBefore,
  )
}

/**
 * @param {import('../schema.d.ts').ResumeSchema['work']} work
 * @returns {string | false}
 */
export default function Work(work = []) {
  const nestedWorks = work.reduce((acc, { description, name, url, ...rest }) => {
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
      html`<div class="stack">
        ${nestedWorks.map(({ breakBefore, ...nestedWork }, i) =>
          NestedWork({ ...nestedWork, breakBefore: !!breakBefore && i > 0 }),
        )}
      </div>`,
      !!firstItem?.breakBefore,
    )
  )
}
