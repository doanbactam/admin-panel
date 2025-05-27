'use client'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface ClerkProviderWrapperProps {
  children: React.ReactNode
}

export const ClerkProviderWrapper = ({ children }: ClerkProviderWrapperProps) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <ClerkProvider>
        {children}
      </ClerkProvider>
    )
  }

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === 'dark' ? dark : undefined,
        variables: {
          colorPrimary: theme === 'dark' ? '#ffffff' : '#000000',
          colorBackground: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          colorInputBackground: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          colorInputText: theme === 'dark' ? '#fafafa' : '#0a0a0a',
          colorText: theme === 'dark' ? '#fafafa' : '#0a0a0a',
          colorTextSecondary: theme === 'dark' ? '#a1a1aa' : '#71717a',
          borderRadius: '0.5rem',
        },
        elements: {
          formButtonPrimary: {
            backgroundColor: theme === 'dark' ? '#ffffff' : '#000000',
            color: theme === 'dark' ? '#000000' : '#ffffff',
            '&:hover': {
              backgroundColor: theme === 'dark' ? '#e5e5e5' : '#262626',
            },
          },
          card: {
            backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff',
            border: `1px solid ${theme === 'dark' ? '#27272a' : '#e4e4e7'}`,
            borderRadius: '0.5rem',
          },
          headerTitle: {
            color: theme === 'dark' ? '#fafafa' : '#0a0a0a',
          },
          headerSubtitle: {
            color: theme === 'dark' ? '#a1a1aa' : '#71717a',
          },
          socialButtonsBlockButton: {
            backgroundColor: theme === 'dark' ? '#18181b' : '#f4f4f5',
            border: `1px solid ${theme === 'dark' ? '#27272a' : '#e4e4e7'}`,
            color: theme === 'dark' ? '#fafafa' : '#0a0a0a',
            '&:hover': {
              backgroundColor: theme === 'dark' ? '#27272a' : '#e4e4e7',
            },
          },
          dividerLine: {
            backgroundColor: theme === 'dark' ? '#27272a' : '#e4e4e7',
          },
          formFieldInput: {
            backgroundColor: theme === 'dark' ? '#0a0a0a' : '#ffffff',
            border: `1px solid ${theme === 'dark' ? '#27272a' : '#e4e4e7'}`,
            color: theme === 'dark' ? '#fafafa' : '#0a0a0a',
            '&:focus': {
              borderColor: theme === 'dark' ? '#ffffff' : '#000000',
              boxShadow: `0 0 0 2px ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
            },
          },
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
