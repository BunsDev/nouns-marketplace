import useSWR from 'swr'
import { ActiveNounishAuctionResponse } from '@noun-auction/typings'
import { activeNounishAuction, zoraApiFetcher } from '@noun-auction/data'

export function useActiveNounishAuction(marketType?: string) {
  const { data: response, error } = useSWR(
    [`active-nounish-auction_${marketType}`],
    () => zoraApiFetcher(() => activeNounishAuction(marketType)),
    {
      refreshInterval: 1500,
    }
  )

  return {
    data: response?.data?.market
      ? (response?.data?.market as ActiveNounishAuctionResponse)
      : undefined,
    error,
  }
}
