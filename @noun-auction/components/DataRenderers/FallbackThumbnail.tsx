import { Box, BoxProps } from '@zoralabs/zord'
import { useNounsToken } from '@noun-auction/hooks/useNounsToken'

export interface FallbackThumbnailProps extends BoxProps {
  tokenId: string
  tokenContract: string
}

export function FallbackThumbnail({
  tokenId,
  tokenContract,
  ...props
}: FallbackThumbnailProps) {
  const { tokenData } = useNounsToken(tokenContract, tokenId)
  return (
    <Box
      as="img"
      inset="x0"
      w="100%"
      h="100%"
      position="absolute"
      {...props}
      src={tokenData?.image}
    />
  )
}
