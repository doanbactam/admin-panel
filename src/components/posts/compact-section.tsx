'use client'

import { Card, CardContent } from '@/components/ui/card'
import { SectionHeader } from './section-header'

interface CompactSectionProps {
  title: string
  icon: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
  badge?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export const CompactSection = ({
  title,
  icon,
  isExpanded,
  onToggle,
  badge,
  required = false,
  children,
  className = ''
}: CompactSectionProps) => {
  return (
    <Card className={`border border-gray-200 dark:border-gray-700 ${className}`}>
      <SectionHeader
        title={title}
        icon={icon}
        isExpanded={isExpanded}
        onToggle={onToggle}
        badge={badge}
        required={required}
      />
      
      {isExpanded && (
        <CardContent className="pt-0 pb-4 px-4">
          {children}
        </CardContent>
      )}
    </Card>
  )
}
