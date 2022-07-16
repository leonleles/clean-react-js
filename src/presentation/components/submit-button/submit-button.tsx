import Context from '@/presentation/contexts/form/form-context'
import React, { useContext } from 'react'

type Props = {
  text: string
}

export const SubmitButton: React.FC<Props> = ({ text }) => {
  const { state } = useContext(Context)
  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">
      {text}
    </button>
  )
}
