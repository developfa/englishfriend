import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function extractQuotes(content: string): string[] {
  // Simple regex to extract quoted text
  const quoteRegex = /"([^"]+)"/g
  const matches = content.match(quoteRegex)
  return matches ? matches.map(match => match.replace(/"/g, '')) : []
}