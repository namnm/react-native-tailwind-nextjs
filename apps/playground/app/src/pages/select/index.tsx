'use client'

import { useState } from 'react'

import { Select } from '@/rn/components/select'
import { H1, Span } from '@/rn/components/text'
import { ScrollView } from '@/rn/core/components/scroll-view'
import { View } from '@/rn/core/components/view'
import { useSafeAreaPadding } from '@/rn/core/responsive/use-safe-area'
import { upperFirst } from '@/shared/lodash'
import { NavLayout } from '#/components/nav-layout'

const appearances = ['outlined', 'filled', 'ghost', 'underlined'] as const
const sizes = ['sm', 'md', 'lg'] as const
const shapes = ['rounded', 'pill', 'none'] as const

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'durian', label: 'Durian' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
]

export const SelectPage = () => {
  const padding = useSafeAreaPadding()
  const [controlled, setControlled] = useState('banana')
  const [multi, setMulti] = useState<string[]>(['banana', 'cherry'])

  return (
    <NavLayout>
      <ScrollView
        className='flex-1 bg-white transition dark:bg-gray-900'
        contentContainerClassName={padding}
      >
        <View className='gap-8 px-4 py-6'>
          <View className='flex-row items-center gap-3'>
            <H1 className='text-foreground text-2xl font-semibold transition'>
              Select
            </H1>
          </View>

          <View className='gap-3'>
            <Span className='text-foreground text-lg font-semibold transition'>
              appearance
            </Span>
            <View className='gap-3'>
              {appearances.map(appearance => (
                <View key={appearance} className='gap-1.5'>
                  <Span className='text-foreground text-xs transition'>
                    {upperFirst(appearance)}
                  </Span>
                  <Select
                    appearance={appearance}
                    items={fruits}
                    title={upperFirst(appearance)}
                    placeholder='Select a fruit..'
                  />
                </View>
              ))}
            </View>
          </View>

          <View className='gap-3'>
            <Span className='text-foreground text-lg font-semibold transition'>
              size
            </Span>
            <View className='gap-3'>
              {sizes.map(size => (
                <View key={size} className='gap-1.5'>
                  <Span className='text-foreground text-xs transition'>
                    {upperFirst(size)}
                  </Span>
                  <Select
                    size={size}
                    items={fruits}
                    title={upperFirst(size)}
                    placeholder='Select a fruit..'
                  />
                </View>
              ))}
            </View>
          </View>

          <View className='gap-3'>
            <Span className='text-foreground text-lg font-semibold transition'>
              shape
            </Span>
            <View className='gap-3'>
              {shapes.map(shape => (
                <View key={shape} className='gap-1.5'>
                  <Span className='text-foreground text-xs transition'>
                    {upperFirst(shape)}
                  </Span>
                  <Select
                    shape={shape}
                    items={fruits}
                    title={upperFirst(shape)}
                    placeholder='Select a fruit..'
                  />
                </View>
              ))}
            </View>
          </View>

          <View className='gap-3'>
            <Span className='text-foreground text-lg font-semibold transition'>
              controlled
            </Span>
            <Select
              items={fruits}
              title='Pick a fruit'
              value={controlled}
              onChange={setControlled}
            />
            <Span className='text-foreground text-xs transition'>
              Selected: {controlled || '-'}
            </Span>
          </View>

          <View className='gap-3'>
            <Span className='text-foreground text-lg font-semibold transition'>
              multiple
            </Span>
            <Select
              multiple
              items={fruits}
              title='Pick fruits'
              value={multi}
              onChange={setMulti}
            />
            <Span className='text-foreground text-xs transition'>
              Selected: {multi.length ? multi.join(', ') : '-'}
            </Span>
          </View>

          <View className='gap-3'>
            <Span className='text-foreground text-lg font-semibold transition'>
              disabled
            </Span>
            <Select items={fruits} defaultValue='apple' disabled />
          </View>
        </View>
      </ScrollView>
    </NavLayout>
  )
}
