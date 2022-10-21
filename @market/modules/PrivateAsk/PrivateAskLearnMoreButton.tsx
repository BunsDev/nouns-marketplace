import React from 'react'

import { Hyperlink } from '@shared/components/DataTable/DataTableItem'
import { Button, ButtonProps, Icon, Paragraph, mixins } from '@zoralabs/zord'

import * as styles from './PrivateAskLearnMoreButton.css'

export interface PrivateAskLearnMoreButtonProps extends ButtonProps, Hyperlink {}

export function PrivateAskLearnMoreButton({
  children = 'Learn more about selling on Zora', // overrideable default text
  target = '_blank',
  href = 'https://support.zora.co/en/articles/5878598-what-s-an-approval',
  ...props
}: PrivateAskLearnMoreButtonProps) {
  return (
    <Button
      as="a"
      variant="unset"
      className={mixins({ hoverFadeOut: true })}
      target={target}
      href={href}
      {...props}
    >
      <Paragraph size="sm" color="text4">
        {children}
        <Icon
          className={styles.offsetY}
          display="inline-block"
          id="ArrowRightAngle"
          size="sm"
          ml="x2"
        />
      </Paragraph>
    </Button>
  )
}
