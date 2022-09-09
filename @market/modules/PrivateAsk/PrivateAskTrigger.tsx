import {
  CANCEL,
  UPDATE_SUCCESS,
  UPDATE,
  PrivateAskAction,
  APPROVE_MODULE_FOR_FILL,
  useFormattedPrivateAskInfo,
  APPROVE_TRANSFER,
  usePrivateAskStateContext,
} from '@market/modules/PrivateAsk/'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, Separator, Stack, Well } from '@zoralabs/zord'
import React from 'react'

import { useRelevantMarket, useAskHelper } from '@market/hooks'
import { DataTable, useIsOwner } from '@shared'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'

// import {
//   APPROVE_MODULE_FOR_FILL,
//   APPROVE_MODULE_FOR_CREATE,
//   APPROVE_TRANSFER,
//   CREATE,
//   CREATE_SUCCESS,
//   UPDATE,
//   UPDATE_SUCCESS,
//   LIST,
//   RESET,
//   CANCEL,
//   CANCEL_SUCCESS,
//   FILLASK,
//   FILLASK_SUCCESS,
//   usePrivateAskStateContext,
// } from '@market/modules/PrivateAsk/providers/PrivateAskStateProvider'

interface PrivateAskTriggerProps {
  nft: NFTObject
  openModal: () => void
  // dispatch: React.Dispatch<PrivateAskAction>
}

export function PrivateAskTrigger({
  nft,
  openModal,
}: // openModal, dispatch
PrivateAskTriggerProps) {
  const {
    // state,
    dispatch,
    // handleNext,
    // handleClose,
    // isModalOpen, toggleModalOpen
  } = usePrivateAskStateContext()
  const { ask } = useRelevantMarket(nft.markets)
  const { hasActivePrivateAsk, displayAskAmount, usdAskAmount, isValidPrivateAskBuyer } =
    useAskHelper({ ask })
  const { isOwner } = useIsOwner(nft)
  const { formattedAskDetails } = useFormattedPrivateAskInfo({ nft })

  return isOwner ? (
    <>
      {hasActivePrivateAsk ? (
        <Stack gap="x2">
          <Button
            w="100%"
            onClick={() => {
              dispatch && dispatch({ type: UPDATE })
              // dispatch && dispatch({ type: UPDATE_SUCCESS })
              // dispatch && dispatch({ type: APPROVE_TRANSFER })
              openModal()
              // toggleModalOpen()
            }}
          >
            Update Private Listing
          </Button>
          <Button
            variant="destructive"
            w="100%"
            onClick={() => {
              dispatch && dispatch({ type: CANCEL })
              openModal()
              // toggleModalOpen()
            }}
          >
            Cancel Private Listing
          </Button>
        </Stack>
      ) : (
        <Button w="100%" onClick={openModal}>
          Create Private Listing
        </Button>
      )}
    </>
  ) : (
    isValidPrivateAskBuyer && (
      <Well gap="x6">
        {displayAskAmount && (
          <PriceWithLabel
            label="Private Listing"
            symbol="ETH"
            cryptoAmount={displayAskAmount}
            usdAmount={usdAskAmount}
          />
        )}

        <Separator />
        {formattedAskDetails && <DataTable items={formattedAskDetails} />}

        <Button
          w="100%"
          onClick={() => {
            dispatch && dispatch({ type: APPROVE_MODULE_FOR_FILL })
            // toggleModalOpen()
            openModal()
          }}
        >
          Buy NFT Privately
        </Button>
      </Well>
    )
  )
}
