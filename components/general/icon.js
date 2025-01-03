/**
 * @param {string} name
 * @returns {string | undefined}
 */
export default function Icon(name) {
  return `<i class="zmdi zmdi-${name.toLowerCase()}"></i>`
}
