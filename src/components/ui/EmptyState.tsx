'use client';

import { motion } from 'framer-motion';
import { LucideIcon, Search, BookOpen, Users, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  variant?: 'default' | 'search' | 'courses' | 'error';
  className?: string;
}

const iconMap = {
  default: AlertCircle,
  search: Search,
  courses: BookOpen,
  error: AlertCircle
};

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  variant = 'default',
  className = ''
}: EmptyStateProps) {
  const IconComponent = icon || iconMap[variant];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`text-center py-12 px-6 ${className}`}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto"
      >
        {description}
      </motion.p>
      
      {(actionLabel && (actionHref || onAction)) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {actionHref ? (
            <a href={actionHref} className="btn-primary">
              {actionLabel}
            </a>
          ) : (
            <Button onClick={onAction} className="btn-primary">
              {actionLabel}
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}