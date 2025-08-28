import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild = false, ...props }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      {
        // Variants
        'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500': variant === 'default',
        'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500': variant === 'secondary',
        'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500': variant === 'outline',
        'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500': variant === 'ghost',
        
        // Sizes
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-4': size === 'md',
        'h-12 px-6 text-lg': size === 'lg',
      },
      className
    )

    if (asChild) {
      // Return just the className to be applied to the child element
      return (
        <span className={baseClasses} ref={ref} {...props} />
      )
    }

    return (
      <button
        className={baseClasses}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }