'use client'

import Image from 'next/image'
import clsx from 'clsx'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface Action {
  label: string
  value: string
  imageUrl: string
}

interface Props {
  actions: Action[]
  selected: string
  onSelect: (value: string) => void
  disabled?: boolean
}

export default function ActionSelector({ actions, selected, onSelect, disabled = false }: Props) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
      {actions.map(action => {
        const isSelected = selected === action.value

        return (
          <button
            key={action.value}
            type='button'
            disabled={disabled}
            onClick={() => onSelect(action.value)}
            className={clsx(
              'relative rounded-lg overflow-hidden border-2 p-2 group transition-all duration-200 focus:outline-none',
              isSelected
                ? 'border-indigo-500 ring-2 ring-indigo-300 scale-[1.02] shadow-lg'
                : 'border-gray-300 hover:border-indigo-300 hover:scale-[1.01]',
              disabled && 'opacity-50 pointer-events-none'
            )}
          >
            {/* Action Image */}
            <div className='relative w-full h-28'>
              <Image
                src={action.imageUrl}
                alt={action.label}
                fill
                className='object-cover rounded-md transition-opacity duration-200'
                sizes='(max-width: 768px) 50vw, 25vw'
              />
            </div>

            {/* Action Label */}
            <span className='absolute bottom-2 left-2 text-xs bg-black/70 text-white px-2 py-1 rounded'>
              {action.label}
            </span>

            {/* Tick on selected */}
            {isSelected && (
              <CheckCircleIcon className='absolute top-2 right-2 h-6 w-6 text-indigo-500 drop-shadow-md' />
            )}
          </button>
        )
      })}
    </div>
  )
}
