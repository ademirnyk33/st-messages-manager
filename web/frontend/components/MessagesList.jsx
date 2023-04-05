import {Page, DataTable, useIndexResourceState, IndexTable, TextField } from '@shopify/polaris';
//import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import React from 'react';

export function MessagesListShow() {
  
  let rowMarkup2 = [];
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
          rowMarkup2 = messageList.map(
          ({idMsg, message, active, startDate, endDate}, index) => (
            <IndexTable.Row
              id={idMsg}
              key={idMsg}
              selected={selectedResources.includes(idMsg)}
              position={index}
            >
              <IndexTable.Cell>{message}</IndexTable.Cell>
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
        ]}
      >
        {rowMarkup2}
      </IndexTable>
    </Page>
  );


}
