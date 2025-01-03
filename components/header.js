import { html } from '@rbardini/html'
import markdown from '../utils/markdown.js'
import Link from './link.js'
import Icon from './icon.js'

/**
 * @param {string} countryCode
 * @returns {string | undefined}
 */
const formatCountry = countryCode =>
  Intl.DisplayNames ? new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) : countryCode

/**
 * @param {import('../schema.d.ts').ResumeSchema['basics']} basics
 * @returns {string}
 */
export default function Header(basics = {}) {
  const { email, image, label, location, name, phone, profiles = [], summary, url } = basics

  return html`
    <header class="masthead">
      ${image && html`<img src="${image}" alt="" />`}
      <div>
        <div class="title-row">
          ${name && html`<h1>${name}</h1>`}
          ${location?.city &&
          html`
            <div class="icon-item">
              ${Icon('pin')}
              <span>${location.city}${location.countryCode && html`, ${formatCountry(location.countryCode)}`}</span>
            </div>
          `}
        </div>
        ${label && html`<h2>${label}</h2>`}
      </div>
      ${summary && html`<article>${markdown(summary)}</article>`}
      <ul class="icon-list">
        ${email &&
        html`
          <li class="icon-item">
            ${Icon('email')}
            <a href="mailto:${email}">${email}</a>
          </li>
        `}
        ${phone &&
        html`
          <li class="icon-item">
            ${Icon('smartphone')}
            <a href="tel:${phone.replace(/\s/g, '')}">${phone}</a>
          </li>
        `}
        ${url && html`<li class="icon-item">${Icon('link')} ${Link(url)}</li>`}
        ${profiles.map(
          ({ network, url, username }) => html`
            <li class="icon-item">${network && Icon(network)} ${Link(url, username)}</li>
          `,
        )}
      </ul>
    </header>
  `
}
