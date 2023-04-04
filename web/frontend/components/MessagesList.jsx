//import { useState, useCallback, useEffect } from "react";
import {Page, DataTable, useIndexResourceState, IndexTable, TextField } from '@shopify/polaris';
//React-Form verificar
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import React from 'react';

export function MessagesListShow() {
  
  // const emptyToastProps = { content: null };
  // const [toastProps, setToastProps] = useState(emptyToastProps);
  // const fetch = useAuthenticatedFetch();
  // const toastMarkup = toastProps.content && !isRefetchingCount && (
  //   <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  // );
  let rowMarkup2 = [];
  //console.log("Antes de useAppQuery");
  const {
    data: messageList,
    isLoading: isLoadingDiscounts,
    isError: discountsError,
  } = useAppQuery({ url: "/api/stMessages" });

      const resourceName = {
        singular: 'Message',
        plural: 'Messages',
      };
     
    const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(messageList);

       if (messageList !== undefined){
          //console.log(messageList);
          rowMarkup2 = messageList.map(
          ({idMsg, message, active, startDate, endDate}, index) => (
            <IndexTable.Row
              id={idMsg}
              key={idMsg}
              selected={selectedResources.includes(idMsg)}
              position={index}
            >
              <IndexTable.Cell>{message}</IndexTable.Cell>
              {/* <IndexTable.Cell>{active}</IndexTable.Cell>
              <IndexTable.Cell>{startDate}</IndexTable.Cell>
              <IndexTable.Cell>{endDate}</IndexTable.Cell> */}
            </IndexTable.Row>
          ),
        );
      }else{
        //console.log("No se")
      }
    

  
  return (
    <Page title="List">
        <IndexTable
        resourceName={resourceName}
        itemCount={1}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Message'},
          // {title: 'Active'},
          // {title: 'Start date'},
          // {title: 'End date'},
        ]}
      >
        {rowMarkup2}
      </IndexTable>
    </Page>
  );


}
