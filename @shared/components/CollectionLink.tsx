import NextLink from 'next/link'
import { ButtonProps, Button } from 'components/Button'
import { ReactNode } from 'react'

export interface CollectionLinkProps extends ButtonProps {
  contractAddress: string
  children: ReactNode
  className?: any
}

export function CollectionLink({
  contractAddress,
  children,
  className,
  ...props
}: CollectionLinkProps) {
  return (
    <NextLink passHref href={`/collections/${contractAddress}`}>
      <Button as="a" {...props}>
        {children}
      </Button>
    </NextLink>
  )
}
