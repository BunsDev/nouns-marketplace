import { useEnsName } from 'wagmi'

import { useMemo } from 'react'

import { AddressZero } from '@ethersproject/constants'
import { sideBarUpperLabel } from '@noun-auction/styles/NounishStyles.css'
import { isAddressMatch, lightFont, useShortAddress } from '@shared'
import { Flex, Icon, Label } from '@zoralabs/zord'

import { EnsAvatar } from './EnsAvatar'

export function AuctionBidder({
  label = 'Top bidder',
  layoutDirection = 'row',
  showLabels,
  useAvatar = true,
  layout,
  activeAuction,
  ...props
}: // FIXME
any) {
  const { data: ensName } = useEnsName({
    address: activeAuction?.highestBidder,
  })

  const shortAddress = useShortAddress(activeAuction?.highestBidder)
  const highestBidder = useMemo(() => activeAuction?.highestBidder, [activeAuction])

  const highestBidderAddress = useMemo(
    () =>
      activeAuction?.properties?.highestBidder
        ? activeAuction?.properties?.highestBidder
        : undefined,
    [activeAuction?.properties?.highestBidder]
  )

  const hasNonZeroHighestBidder = useMemo(
    () => !isAddressMatch(highestBidderAddress, AddressZero),
    [highestBidderAddress]
  )

  return (
    <Flex
      direction={layoutDirection}
      target="_blank"
      gap={layoutDirection === 'row' ? 'x2' : 'x0'}
      rel="noreferrer"
      align={layoutDirection === 'row' ? 'center' : 'flex-start'}
      wrap="wrap"
      display={{
        '@initial': `${layout === 'row' ? 'none' : 'flex'}`,
        '@1024': 'flex',
      }}
      {...props}
    >
      {showLabels && (
        <Label
          size="md"
          className={[layout === 'sideBarBid' && sideBarUpperLabel, lightFont]}
          color={layout === 'sideBarBid' ? 'tertiary' : 'secondary'}
          style={{ lineHeight: '1.15' }}
        >
          {label}&nbsp;
        </Label>
      )}
      <Flex>
        <Label
          size="md"
          style={{ lineHeight: '1.15' }}
          align="right"
          className={[sideBarUpperLabel]}
          color={hasNonZeroHighestBidder ? 'primary' : 'tertiary'}
        >
          {hasNonZeroHighestBidder ? (
            <Flex gap="x2" align="center">
              <Label size="md" gap="x1" align={'center'} style={{ lineHeight: '1.15' }}>
                {ensName ?? shortAddress}
              </Label>
              {useAvatar && (
                <>
                  {layout !== 'sideBarBid' && highestBidderAddress ? (
                    <EnsAvatar address={highestBidderAddress} />
                  ) : (
                    <Icon id="ArrowRightAngle" />
                  )}
                </>
              )}
            </Flex>
          ) : (
            <>No bids</>
          )}
        </Label>
      </Flex>
    </Flex>
  )
}
