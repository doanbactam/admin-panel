'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SectionHeaderProps {
  title: string
  icon: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
  badge?: string
  required?: boolean
  className?: string
}

export const SectionHeader = ({
  title,
  icon,
  isExpanded,
  onToggle,
  badge,
  required = false,
  className = ''
}: SectionHeaderProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onToggle}
      className={`w-full justify-between p-3 h-auto hover:bg-gray-50 dark:hover:bg-gray-800 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="text-blue-600 dark:text-blue-400">
          {icon}
        </div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          {required && (
            <span className="text-red-500 text-sm">*</span>
          )}
          {badge && (
            <Badge variant="secondary" className="text-xs">
              {badge}
            </Badge>
          )}
        </div>
      </div>
      <div className="text-gray-400">
        {isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
    </Button>
  )
}
