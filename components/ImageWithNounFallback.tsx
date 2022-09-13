import { returnDao } from 'constants/collection-addresses'
import { FallbackThumbnail } from '@noun-auction'
import { ImageElement } from './ImageElement'
import { useMemo } from 'react'

export function ImageWithNounFallback({
  srcImg,
  tokenContract,
  tokenId,
}: {
  srcImg?: string
  tokenContract: string
  tokenId: string
}) {
  const isDao = useMemo(() => returnDao(tokenContract) !== undefined, [tokenContract])

  // if (srcImg) {
  //   return (
  //     <ImageElement
  //       src={srcImg}
  //       w="100%"
  //       h="100%"
  //       position="absolute"
  //       inset="x0"
  //       objectFit="cover"
  //     />
  //   )
  // }

  if (isDao)
    return (
      <FallbackThumbnail
        tokenContract={tokenContract}
        tokenId={tokenId}
        objectFit="cover"
      />
    )

  return <></>
}
