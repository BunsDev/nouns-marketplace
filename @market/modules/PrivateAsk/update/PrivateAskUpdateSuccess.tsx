import { Button } from 'components/Button'

import React from 'react'

import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { Stack } from '@zoralabs/zord'

import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { PrivateAskHeadingDescription } from '../PrivateAskHeadingDescription'

interface PrivateAskCreateSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskUpdateSuccess({
  nft,
  onNext,
  ...props
}: PrivateAskCreateSuccessProps) {
  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />
      <PrivateAskHeadingDescription
        heading="Private Listing Updated"
        description="The listing price has been changed."
      />
      <Button onClick={onNext}>Done</Button>
    </Stack>
  )
}
