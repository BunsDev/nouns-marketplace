import { useMemo } from 'react'
import { useEnsName } from 'wagmi'
import { Flex, Label, Icon } from '@zoralabs/zord'

// @noun-auction
import { SharedDataRendererProps } from '@noun-auction/typings'
import { EnsAvatar } from './EnsAvatar'

// @shared
import { useShortAddress } from 'hooks/useShortAddress'
import { lightFont } from 'styles/styles.css'

export function AuctionBidder({
  label = 'Top bidder',
  layoutDirection = 'row',
  showLabels,
  txHash,
  address,
  ...props
}: {
  address: string
  txHash: string
} & SharedDataRendererProps) {
  const { data: ensName } = useEnsName({
    address: address,
  })

  const shortAddress = useShortAddress(address)

  const buildTxLink = useMemo(() => `https://etherscan.io/tx/${txHash}`, [txHash])

  return (
    <Flex
      direction={layoutDirection}
      as="a"
      href={buildTxLink}
      target="_blank"
      rel="noreferrer"
      align={layoutDirection === 'row' ? 'center' : 'flex-start'}
      wrap="wrap"
      {...props}
    >
      {showLabels && (
        <Label
          size="lg"
          className={lightFont}
          color="secondary"
          style={{ lineHeight: '1.15' }}
          textAlign="right"
        >
          {label}&nbsp;
        </Label>
      )}
      <Flex>
        <Label size="lg" style={{ lineHeight: '1.15' }} align="right">
          <Flex gap="x2" align="center">
            <EnsAvatar address={address} />
            <Flex gap="x1" align={'center'} style={{ lineHeight: '1.15' }}>
              {ensName ? ensName : shortAddress}
            </Flex>
            <Icon id="ArrowRightAngle" size="sm" />
          </Flex>
        </Label>
      </Flex>
    </Flex>
  )
}
