import React, { useEffect } from 'react'
import { Heading, Paragraph, Stack } from '@zoralabs/zord'

import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { usePrivateAskTransaction } from '../hooks/usePrivateAskTransaction'

interface PrivateAskCancelProps extends CommonPrivateAskComponentProps {}

export function PrivateAskCancel({ onNext, ...props }: PrivateAskCancelProps) {
  const { isSubmitting, cancelAsk, txStatus, txInProgress, txError, finalizedTx } =
    usePrivateAskTransaction({ nft: props.nft })
  useEffect(() => finalizedTx!! && onNext && onNext(), [finalizedTx, onNext])

  return (
    <Stack gap="x6" {...props}>
      <Stack gap="x2">
        <Heading as="h2" size="md">
          Cancel Private Listing
        </Heading>
        <Paragraph size="sm" color="text4" align="center">
          Cancel the private listing. This action can not be reversed, but you will be
          able to list the NFT for sale again.
        </Paragraph>

        {txError && (
          <Paragraph size="xs" color="negative">
            {txError}
          </Paragraph>
        )}
      </Stack>
      <TransactionSubmitButton
        type="submit"
        txStatus={txStatus}
        txInProgress={txInProgress}
        onClick={cancelAsk}
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Cancel Private Listing
      </TransactionSubmitButton>
    </Stack>
  )
}
