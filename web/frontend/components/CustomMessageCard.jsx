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
import { useAppQuery, useAuthenticatedFetch } from "../hooks";


export function CustomMessageCard() {
  const emptyToastProps = { content: null };
  //const [messageToShow, setMsgValue] = useState("Test00");
  let messageToShow = "Hello World!";
  let startDate = Date.now;
  let endDate = Date.now;
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
  });
  // const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();

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

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  
  const handleMessageChange = useCallback((newValue) => {
    messageToShow = newValue;
    
  }, []);
  const handleStartDate = useCallback((startDateForm) => {startDate = startDateForm}, []);
  const handleEndDate = useCallback((endDateForm) => {endDate = endDateForm}, []);

  const handleSubmit = useCallback((_event) => {
    
    //(body) => {
      (async () => {
        const messageSet = {
          messageString: messageToShow,
          newStartDate: startDate,
          newEndDate: endDate
        };   
        console.log("Antes de validar");
        const responseRows = await fetch(`/api/stMessages/${startDate}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }); 

        console.log(responseRows);
        // const {
        //   data: countMsg,
        //   isLoading,
        //   isRefetching,
        // } = useAppQuery({
        //   url: `/api/stMessages/${startDateForm}`,
        // });
        //console.log(countMsg);

        const response = await fetch("/api/stMessages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ messageSet })
        }); 
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
