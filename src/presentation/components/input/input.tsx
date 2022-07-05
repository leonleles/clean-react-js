import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)
  const error = errorState[props.name]

  const getTitle = (): string => {
    return error
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} autoComplete="off" />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      />
    </div>
  )
}

export default Input
