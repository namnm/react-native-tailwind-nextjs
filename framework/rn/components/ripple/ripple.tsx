/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import { useEffect, useRef, useState } from 'react'

import '@/rn/components/ripple/ripple.css'

import type { RippleData, RippleProps } from '@/rn/components/ripple/config'
import {
  rippleDefaultBackground,
  rippleDurationMs,
} from '@/rn/components/ripple/config'
import { clsx } from '@/rn/core/tw/clsx'
import type { Nullish } from '@/shared/ts-utils'
import { ulid } from '@/shared/ulidx'

export const Ripple = (props: RippleProps | Nullish) => {
  const anchorRef = useRef<HTMLSpanElement>(null)
  const timeoutsRef = useRef<number[]>([])
  const [rippleData, setRippleData] = useState<RippleData[]>([])

  useEffect(() => {
    const parent = anchorRef.current?.parentElement
    if (!parent) {
      return
    }

    const listener = (e: MouseEvent) => {
      if (
        e.button !== 0 ||
        parent.getAttribute('aria-disabled') === 'true' ||
        (parent as any).disabled === true
      ) {
        return
      }

      const rect = parent.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const dx = Math.max(x, rect.width - x)
      const dy = Math.max(y, rect.height - y)
      const size = Math.ceil(Math.sqrt(dx * dx + dy * dy) * 2)

      const id = ulid()
      setRippleData(prev => [...prev, { id, x, y, size }])

      const t = window.setTimeout(() => {
        setRippleData(prev => prev.filter(r => r.id !== id))
      }, rippleDurationMs + 17)

      timeoutsRef.current.push(t)
    }

    parent.addEventListener('mousedown', listener, { passive: true })

    return () => {
      parent.removeEventListener('mousedown', listener)
      for (const t of timeoutsRef.current) {
        window.clearTimeout(t)
      }
      timeoutsRef.current = []
    }
  }, [])

  const className = clsx(
    'ripple',
    rippleDefaultBackground,
    props?.className,
  ) as string

  const ripples = rippleData.map(r => (
    <span
      key={r.id}
      className={className}
      style={{
        left: r.x - r.size / 2,
        top: r.y - r.size / 2,
        width: r.size,
        height: r.size,
      }}
    />
  ))

  return (
    <>
      <span ref={anchorRef} className='hidden' />
      {ripples}
    </>
  )
}
