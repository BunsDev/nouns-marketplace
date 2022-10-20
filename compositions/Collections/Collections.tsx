import { returnDao } from 'constants/collection-addresses'

import { useEffect, useMemo } from 'react'

import { Filter, useCollectionFilters } from '@filter'
import { NFTCard } from '@media/NFTCard'
import { NFTGrid } from '@media/NFTGrid'
import { nftGridWrapper } from '@media/NftMedia.css'
import { useActiveNounishAuction } from '@noun-auction/hooks/useActiveNounishAuction'
import { NFTObject } from '@zoralabs/nft-hooks'
// import * as Sentry from '@sentry/react'
import { Paragraph } from '@zoralabs/zord'

import { NounishActivityRow } from './NounishActivityRow'

type CollectionsGridProps = {
  items: NFTObject[]
  isValidating: boolean
  isReachingEnd?: boolean
  handleLoadMore?: () => void
}

export type CollectionsProps = {
  collectionAddress?: string
  view?: 'activity' | 'nfts' | string
}

export function CollectionGrid({
  items,
  isReachingEnd,
  isValidating,
  handleLoadMore,
}: CollectionsGridProps) {
  return (
    <Filter
      grid={
        <NFTGrid
          items={items}
          handleLoadMore={handleLoadMore}
          isReachingEnd={isReachingEnd}
          isValidating={isValidating}
          nftRenderer={<NFTCard />}
          className={nftGridWrapper()}
        />
      }
    />
  )
}

export function DaoGrid({
  dao,
  view,
  items,
  isReachingEnd,
  isValidating,
  handleLoadMore,
}: {
  dao: any
  view: CollectionsProps['view']
} & CollectionsGridProps) {
  // const { data: activeAuction } = useActiveNounishAuction(dao?.marketType)
  // const filteredItems = useMemo(() => {
  //   try {
  //     return items.filter(
  //       (item) => activeAuction?.properties?.tokenId !== item?.nft?.tokenId
  //     )
  //   } catch (err: any) {
  //     Sentry.captureException(err)
  //     Sentry.captureMessage('DAO Grid filter error: ' + err.message)
  //     return items
  //   }
  // }, [items, activeAuction?.properties?.tokenId])

  const renderer = useMemo(
    () => (view === 'nfts' ? <NFTCard /> : <NounishActivityRow />),
    [view]
  )

  return (
    <Filter
      grid={
        <NFTGrid
          items={items} // filteredItems
          handleLoadMore={handleLoadMore}
          isReachingEnd={isReachingEnd}
          isValidating={isValidating}
          nftRenderer={renderer}
          className={nftGridWrapper({
            layout: view === 'nfts' ? 'grid' : 'activityRows',
          })}
        />
      }
    />
  )
}

export function Collections({ view = 'nfts', collectionAddress }: CollectionsProps) {
  const {
    filterStore: { clearFilters },
  } = useCollectionFilters()
  const { items, isValidating, isReachingEnd, handleLoadMore } = useCollectionFilters()
  const dao = returnDao(collectionAddress)
  const gridProps = { items, isReachingEnd, isValidating, handleLoadMore }

  useEffect(() => {
    clearFilters()
  }, [clearFilters])

  if (!dao) {
    return <CollectionGrid {...gridProps} />
  } else {
    return <DaoGrid dao={dao} view={view} {...gridProps} />
  }
}
