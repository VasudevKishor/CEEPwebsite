export function cn(...args: any[]) {
  const classes: string[] = []

  for (const arg of args) {
    if (!arg) continue
    const t = typeof arg
    if (t === 'string' || t === 'number') {
      classes.push(String(arg))
    } else if (Array.isArray(arg)) {
      classes.push(cn(...arg))
    } else if (t === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) classes.push(key)
      }
    }
  }

  return classes.join(' ')
}
