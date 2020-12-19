import React, { FC, useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { FormInput } from '../Form'


it('create a controlled input', () => {
  const Comp: FC = () => {
    const [value, setValue] = useState<string>('test')
    return <FormInput value={value} setValue={setValue} />
  }

  const { container } = render(
    <Comp />
  )

  const input = container.querySelector('input')
  expect(input?.value).toBe('test')
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test changed' } })
  expect(input?.value).toBe('test changed')
})

it('render placeholder and label', () => {
  const Comp: FC = () => {
    const [value, setValue] = useState<string>('test')
    return <FormInput value={value} setValue={setValue} label='Test' placeholder='write something that matters' />
  }

  const { container } = render(<Comp />)

  const input = container.querySelector('input')
  const label = container.querySelector('label')
  expect(input?.placeholder).toBe('write something that matters')
  expect(label?.textContent).toBe('Test')
})
