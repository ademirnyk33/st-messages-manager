import { useState } from "react";
import {
  Card,
  Heading,
  TextContainer,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAuthenticatedFetch } from "../hooks";

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
            

          </Heading>
        </TextContainer>
      </Card>
    </>
  );
}
