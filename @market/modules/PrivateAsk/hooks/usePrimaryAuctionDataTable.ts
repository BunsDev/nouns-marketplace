import { returnDaoAuctionContract } from 'constants/collection-addresses'

import { useMemo } from 'react'

import { useRelevantMarket } from '@market/hooks'
import { shortenAddress } from '@shared'
import { DataTableItemProps } from '@shared/components/DataTable/DataTableItem'
import { NFTObject } from '@zoralabs/nft-hooks'

interface NounishAuctionInfoProps {
  nft: NFTObject
  primarySalePrice: string
}

export const usePrimaryAuctionDataTable = ({
  nft: nftObj,
  primarySalePrice,
}: NounishAuctionInfoProps) => {
  const { nft, markets } = nftObj
  const { ask } = useRelevantMarket(markets)

  const askPrice = useMemo(() => ask?.amount?.eth?.value, [ask?.amount?.eth?.value])
  const auctionContractAddress = useMemo(
    () => (nft ? returnDaoAuctionContract(nft?.contract.address) : null),
    [nft]
  )

  const askPriceSummary = useMemo(
    () =>
      askPrice
        ? {
            label: 'Price',
            value: `${askPrice} ETH`,
          }
        : null,
    [askPrice]
  )

  const formattedAuctionDataTable = useMemo<DataTableItemProps[] | undefined>(() => {
    const summary = [
      {
        label: 'Owned by',
        value: shortenAddress(nft?.owner?.address),
        url: {
          href: `https://market.zora.co/${nft?.owner?.address}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Minted by',
        value: shortenAddress(nft?.minted.address),
        url: {
          href: `https://market.zora.co/${nft?.minted?.address}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
    ]

    if (primarySalePrice) {
      const primarySummary = {
        label: 'Auctioned for',
        value: `${primarySalePrice} ETH`,
        url: {
          href: `https://etherscan.io/address/${auctionContractAddress}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      }
      summary.push(primarySummary)
    }

    return summary
  }, [nft?.owner?.address, nft?.minted.address, primarySalePrice, auctionContractAddress])

  const copyableValue = useMemo(() => {
    if (!formattedAuctionDataTable) return ''

    return formattedAuctionDataTable
      .map(({ label, copyValue }) => `${label}: ${copyValue}`)
      .join('\r\n')
  }, [formattedAuctionDataTable])

  return {
    formattedAuctionDataTable,
    copyableValue,
    askPriceSummary,
  }
}
