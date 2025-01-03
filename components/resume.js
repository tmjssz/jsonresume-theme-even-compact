import { html } from '@rbardini/html'
import colors from '../utils/colors.js'
import Header from './header.js'
import Meta from './meta.js'
import Awards from './sections/awards.js'
import Certificates from './sections/certificates.js'
import Education from './sections/education.js'
import Interests from './sections/interests.js'
import Languages from './sections/languages.js'
import Projects from './sections/projects.js'
import Publications from './sections/publications.js'
import References from './sections/references.js'
import Skills from './sections/skills.js'
import Volunteer from './sections/volunteer.js'
import Work from './sections/work.js'

/**
 * @param {import('../schema.d.ts').ResumeSchema} resume
 * @param {object} [options]
 * @param {string} [options.css]
 * @param {string} [options.js]
 * @returns
 */
export default function Resume(resume, { css, js } = {}) {
  return html`<!doctype html>
    <html lang="en" style="${colors(resume.meta)}">
      <head>
        <meta charset="utf-8" />
        ${Meta(resume.basics)}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
        />
        ${css &&
        html`<style>
          ${css}
        </style>`}
        ${js &&
        html`<script type="module">
          ${js}
        </script>`}
      </head>
      <body>
        ${Header(resume.basics)}
        <div class="main-content">
          ${Work(resume.work)} ${Volunteer(resume.volunteer)} ${Education(resume.education)}
          ${Projects(resume.projects)} ${Awards(resume.awards)} ${Certificates(resume.certificates)}
          ${Publications(resume.publications)}
        </div>
        <div class="side-content">
          ${Skills(resume.skills)} ${Languages(resume.languages)} ${Interests(resume.interests)}
          ${References(resume.references)}
        </div>
      </body>
    </html>`
}
