import { Heading, Stack, Flex, Paragraph, Box, BoxProps } from '@zoralabs/zord'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { FillV3AskInfo, useRelevantMarket } from '@market'
import { useNFTProvider, useIsOwner, useTitleWithFallback } from '@shared'
import { Link, NounsGlasses } from 'components'
import { clickAnimation } from 'styles/styles.css'
import { nftInfoSidebar, nftInfoSidebarWrapper } from './NFTPage.css'
import { MarketUi } from './MarketUi'

import { lightFont } from '@shared'
import { PrivateAskSidebar } from '@market/components/PrivateAsk/'

export interface NFTInfoSidebar extends BoxProps {}

export function NFTInfoSidebar({ ...props }: NFTInfoSidebar) {
  const { initialData: nft, tokenId, contractAddress } = useNFTProvider()

  if (!nft || !tokenId || !contractAddress) return null

  // console.log('NFT', nft)

  const { fallbackTitle } = useTitleWithFallback(
    contractAddress,
    tokenId,
    nft?.metadata?.name
  )

  return (
    <Box id="nft-info-sidebar" className={nftInfoSidebar} {...props}>
      <Stack className={nftInfoSidebarWrapper}>
        <Flex>
          <Link href={`/collections/${nft?.nft?.contract.address}`}>
            <CollectionThumbnail
              collectionAddress={nft?.nft?.contract.address}
              useTitle
              size="xxs"
              radius="round"
              p="x2"
              pr="x5"
              backgroundColor="tertiary"
              borderRadius="round"
              className={clickAnimation}
            />
          </Link>
        </Flex>
        <Heading as="h1" size="xl">
          {fallbackTitle}
        </Heading>
        {nft?.metadata?.description && (
          <Paragraph size="lg" className={lightFont}>
            {nft?.metadata?.description}
          </Paragraph>
        )}

        <PrivateAskSidebar nft={nft} />
        {nft?.nft && (
          <MarketUi
            contractAddress={nft.nft.contract.address}
            tokenId={nft.nft.tokenId}
            nft={nft}
          />
        )}
      </Stack>
    </Box>
  )
}
