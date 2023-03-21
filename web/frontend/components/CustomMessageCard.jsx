import { useState, useCallback, useEffect } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Form,
  FormLayout,
  TextField,
  Checkbox,
  DatePicker,
  Button
} from "@shopify/polaris";
//React-Form verificar
import { Toast } from "@shopify/app-bridge-react";
import { useToast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import createApp from '@shopify/app-bridge';


export function CustomMessageCard() {
  // const emptyToastProps = { content: null };
  // const [toastProps, setToastProps] = useState(emptyToastProps);
  // const toastMarkup = toastProps.content && !isRefetchingCount && (
  //   <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  // );
//   const config = {
//     // The client ID provided for your application in the Partner Dashboard.
//     apiKey: "st-messages-manager",
//     // The host of the specific shop that's embedding your app. This value is provided by Shopify as a URL query parameter that's appended to your application URL when your app is loaded inside the Shopify admin.
//     host: new URLSearchParams(location.search).get("host"),
//     forceRedirect: true
// };
// const app = createApp(config);
// const toastOptions = {
//   message: 'Error saving',
//   duration: 5000,
//   isError: true,
// };
  const {show} = useToast();
  const fetch = useAuthenticatedFetch();
  //const [messageToShow, setMsgValue] = useState("Test00");
  let messageToShow = "Hello World!";
  let startDate = Date.now;
  let endDate = Date.now;

  // const [isLoading, setIsLoading] = useState(true);
 /*  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  }); */

  

  
  const handleMessageChange = useCallback((newValue) => {
    messageToShow = newValue;
    
  }, []);
  const handleStartDate = useCallback((startDateForm) => {startDate = startDateForm}, []);
  const handleEndDate = useCallback((endDateForm) => {endDate = endDateForm}, []);

  const handleSubmit = useCallback((_event) => {
    
    //(body) => {
      (async () => {
        //const toast = useToast();
        const messageSet = {
          messageString: messageToShow,
          newStartDate: startDate,
          newEndDate: endDate
        };   
        //console.log("Antes de validar");
        const startDateValid = await fetch(`/api/stMessages/${startDate}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }); 
        const respStart = await startDateValid.json();

        const endDateValid = await fetch(`/api/stMessages/${startDate}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }); 
        const respEnd = await endDateValid.json();

        //console.log(resp);
        if(respStart.length !== 0 || respEnd.length !== 0){
          //const toast = useToast();
          show("Las fechas se solapan con otro mensaje activo.", {duration: 2000});
          console.log("Error");
          //toast.show({ content: "Your message goes here" });
          
          return { status: "Error" };
        }

        //console.log(resp.length);

        // const {
        //   data: countMsg,
        //   isLoading,
        //   isRefetching,
        // } = useAppQuery({
        //   url: `/api/stMessages/${startDateForm}`,
        // });
        //console.log(countMsg);
        //console.log("Antes de crear");
        const response = await fetch("/api/stMessages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ messageSet })
        }); 
        show("The message was created.", {duration: 2000});
      })();
      return { status: "success" };

  }, []);


  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>

      <TextField
          value={null}
          onChange={ handleMessageChange }
          label="Message to show"
          helpText={
            <span>
              This message will show in the confirmation page.
            </span>
          }
        />
        <FormLayout.Group condensed>
        <Checkbox
          label="Bold"
          checked={null}
          onChange={null}
        />
        <Checkbox
          label="Italic"
          checked={null}
          onChange={null}
        />
        </FormLayout.Group>
        <FormLayout.Group>
            <TextField
              value={null}
              onChange={handleStartDate}
              label="Start date"
              type="date"
              // autoComplete="email"
              helpText={
                <span>
                  Use this to speficy when the message begin to diplay.
                </span>
              }
            />
            <TextField
              value={null}
              onChange={handleEndDate}
              label="End date"
              type="date"
              // autoComplete="email"
              helpText={
                <span>
                  Use this to speficy when the message end to diplay.
                </span>
              }
            />
        </FormLayout.Group>
        <Button submit>Create</Button>
      </FormLayout>
    </Form>
  );
}
