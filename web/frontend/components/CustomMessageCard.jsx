import {useState, useCallback, useMemo} from 'react';
import {
  Listbox,
  Form,
  FormLayout,
  TextField,
  Combobox,
  Button,
  Icon
} from "@shopify/polaris";
import { useToast, useNavigate } from "@shopify/app-bridge-react";
import {  useAuthenticatedFetch } from "../hooks";


export function CustomMessageCard() {
  const navigate = useNavigate();
  const {show} = useToast();
  const fetch = useAuthenticatedFetch();
  //const [messageToShow, setMsgValue] = useState("Test00");
  let messageToShow = "Hello World!";
  // let startDate = Date.now;
  // let endDate = Date.now;


  const handleMessageChange = useCallback((newValue) => {
    messageToShow = newValue;
    
  }, []);
  
  const handleSubmit = useCallback((_event) => {
    

      (async () => {


        const messageSet = {
          messageString: messageToShow,
          // newStartDate: startDate,
          // newEndDate: endDate
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
        </FormLayout.Group>


        <FormLayout.Group>                      
        </FormLayout.Group>
        <Button submit>Create</Button>
      </FormLayout>
    </Form>
  );
}
