import { useState, useCallback, useEffect } from "react";
import {Page, DataTable} from '@shopify/polaris';
//React-Form verificar
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";


export function MessagesListShow() {
  const emptyToastProps = { content: null };
  //const [messageToShow, setMsgValue] = useState("Test00");
  let messageToShow = "Hello World!";
  let startDate = Date.now;
  let endDate = Date.now;
    let rows;
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handleSubmit = useCallback((_event) => {
    
      (async () => {
        const messageSet = {
          messageString: messageToShow,
          newStartDate: startDate,
          newEndDate: endDate
        };

        // if (response.ok) {
          try{
          const responseGet = await fetch("/api/stMessages", {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          });
          console.log(responseGet);
        } catch (error) {
          console.error(error);
          res.status(500).send(error.message);
        }

      })();
      return { status: "success" };

  }, []);


  return (
    <Page title="Sales by product">

        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'numeric',
            'numeric',
            'numeric',
          ]}
          headings={[
            'Product',
            'Price',
            'SKU Number',
            'Net quantity',
            'Net sales',
          ]}
          rows={rows}

        />

    </Page>
  );
}
