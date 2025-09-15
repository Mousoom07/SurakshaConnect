import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes while supporting conditional class building
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
