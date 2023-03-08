import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";
import { DatePicker } from '@shopify/polaris';

export function CustomMessageCard() {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(false);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();


  const toastMarkup = toastProps.content && !isRefetchingCount && (
    
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
    
  );
    const createMessage = async () => {      
      setIsLoading(true);
      setToastProps({ content: "Message created!" });
      //setIsLoading(false);
    }

  const [text, setText] = useState('');
  function handleInputChange(event) {
    setText(event.target.value);
  }
  const [selectedDate, setSelectedDate] = useState(null);

  function handleDateChange(date) {
    setSelectedDate(date);
  }
  return (
    <>
      {toastMarkup}
      <Card
        title="Create Message"
        sectioned
        primaryFooterAction={{
          content: "Create",
          onAction: createMessage,
          //loading: isLoading,
        }}
      >
        <TextContainer spacing="loose">
          <p>
            Tell me the message:
          </p>
          <Heading element="h4">
            <div>
            <label htmlFor="input">Message: </label>
            <input type="text" id="input" value={text} onChange={handleInputChange} />
            </div>
            <div>
              <DatePicker
                month={selectedDate && selectedDate.getMonth()}
                year={selectedDate && selectedDate.getFullYear()}
                selected={selectedDate}
                onChange={handleDateChange}
                allowRange={false}
                timePicker
                showControls
              />
              {/* <p>La fecha seleccionada es: {selectedDate && selectedDate.toString()}</p> */}
          </div>
          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
