'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BaseCardProps {
  children: React.ReactNode
  imageUrl: string
  altText: string
  className?: string
}

export const BaseTravelCard = ({
  children,
  imageUrl,
  altText,
  className
}: BaseCardProps) => (
  <motion.div
    className={cn(
      'group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800',
      className
    )}
    whileHover={{ y: -5 }}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
  >
    <div className="relative h-64 w-full">
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </motion.div>
)