/**
 * 过滤器
 */

export function capitalize (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function formatDate (timeStamp) {
  const date = new Date(timeStamp)
  return date.toLocaleString()
}

export function numbernic (number) {
  return parseFloat(number).toLocaleString()
}
