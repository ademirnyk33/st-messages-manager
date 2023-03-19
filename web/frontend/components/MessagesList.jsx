import { useState, useCallback, useEffect } from "react";
import {Page, DataTable, useIndexResourceState, IndexTable, TextField } from '@shopify/polaris';
//React-Form verificar
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import React from 'react';

export function MessagesListShow() {
  const emptyToastProps = { content: null };
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );
//   const rows = handleSubmit();

//   const rows = [
//     ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
//     ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
//     [
//       'Navy Merino Wool Blazer with khaki chinos and yellow belt',
//       '$445.00',
//       124518,
//       32,
//       '$14,240.00',
//     ],
//   ];
const fillRows = useCallback((_event) => {
    console.log("Fill");
    (async () => {
        try{
        const response = await fetch("/api/stMessages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }); 

        console.log(response);
    
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }

      })();
      return { status: "success" };

    }, []);
    
    //   return { VALUE: [
    //         ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
    //         ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
    //         [
    //           'Navy Merino Wool Blazer with khaki chinos and yellow belt',
    //           '$445.00',
    //           124518,
    //           32,
    //           '$14,240.00',
    //         ],
    //       ] };
    const customers = [
        {
          id: '3411',
          url: '#',
          name: 'Mae Jemison',
          location: 'Decatur, USA',
          orders: 20,
          amountSpent: '$2,400',
        },
        {
          id: '2561',
          url: '#',
          name: 'Ellen Ochoa',
          location: 'Los Angeles, USA',
          orders: 30,
          amountSpent: '$140',
        },
      ];
      const resourceName = {
        singular: 'customer',
        plural: 'customers',
      };
     
    const {selectedResources, allResourcesSelected, handleSelectionChange} = useIndexResourceState(customers);
    const rowMarkup = customers.map(
        ({id, name, location, orders, amountSpent}, index) => (
          <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
          >
            <IndexTable.Cell>{name}</IndexTable.Cell>
            <IndexTable.Cell>{location}</IndexTable.Cell>
            <IndexTable.Cell>{orders}</IndexTable.Cell>
            <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
          </IndexTable.Row>
        ),
      );
      
  return (
    <Page title="Sales by product">
        <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Name'},
          {title: 'Location'},
          {title: 'Order count'},
          {title: 'Amount spent'},
          {title: fillRows},
        ]}
      >
        {rowMarkup}
      </IndexTable>
\

    </Page>
  );
}
