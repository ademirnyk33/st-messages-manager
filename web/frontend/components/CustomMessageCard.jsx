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
import { useToast, useNavigate } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

import createApp from '@shopify/app-bridge';
import { getSessionToken } from '@shopify/app-bridge-utils';


export function CustomMessageCard() {
  const navigate = useNavigate();
  const {show} = useToast();
  const fetch = useAuthenticatedFetch();
  //const [messageToShow, setMsgValue] = useState("Test00");
  let messageToShow = "Hello World!";
  let startDate = Date.now;
  let endDate = Date.now;


  const handleMessageChange = useCallback((newValue) => {
    messageToShow = newValue;
    
  }, []);
  const handleStartDate = useCallback((startDateForm) => {startDate = startDateForm}, []);
  const handleEndDate = useCallback((endDateForm) => {endDate = endDateForm}, []);

  const handleSubmit = useCallback((_event) => {
    

      (async () => {


        const messageSet = {
          messageString: messageToShow,
          newStartDate: startDate,
          newEndDate: endDate
        };   

        console.log("Test01");
        const response = await fetch("/api/stMessages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ messageSet })
        }); 
        show("The message was created.", {duration: 2000});
        navigate("/stMessages/msgShow");
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
