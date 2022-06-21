import { Stack, Display, Paragraph } from '@zoralabs/zord'
import { lightFont, textCenter, maxWidthSm } from 'styles/styles.css'
import { Maybe } from '@zoralabs/nft-hooks/dist/backends/zora-indexer-v1/zora-indexer-types'

export function PageHeader({
  headline,
  copy,
}: {
  headline: Maybe<string> | undefined
  copy?: string
}) {
  return (
    <Stack as="article" align="center" className={maxWidthSm} gap="x4">
      {headline ? (
        <Display className={textCenter} as="h1">
          {headline}
        </Display>
      ) : null}
      {copy ? (
        <Paragraph as="p" size="lg" className={[lightFont, textCenter]} color="primary">
          {copy}
        </Paragraph>
      ) : null}
    </Stack>
  )
}
