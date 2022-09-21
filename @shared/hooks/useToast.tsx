import { Toast } from '@shared/components'
import { useCallback, useState } from 'react'

export const useToast = () => {
  const [text, setText] = useState<string>('')
  const [toastVisible, setToastVisible] = useState<boolean>(false)

  toastVisible && console.log('TOAST VISIBLE')

  const toast = <Toast visible={toastVisible}>{text}</Toast>

  const showToast = useCallback(
    (text: string, timeout: number = 3000): Promise<void> => {
      setText(text)
      setToastVisible(true)

      return new Promise((resolve) => {
        setTimeout(() => {
          setToastVisible(false)
          resolve()
        }, timeout)
      })
    },
    [setText, setToastVisible]
  )

  return { toast, showToast }
}
