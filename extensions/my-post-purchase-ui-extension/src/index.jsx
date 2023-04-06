import { useEffect, useState} from "react";
import {
  extend,
  render,
  useExtensionInput,
  BlockStack,
  Button,
  CalloutBanner,
  Heading,
  Image,
  Text,
  TextContainer,
  Separator,
  Tiles,
  TextBlock,
  Layout,
} from "@shopify/post-purchase-ui-extensions-react";

// For local development, replace APP_URL with your local tunnel URL.


const APP_URL = "https://3239-168-243-236-176.ngrok.io";


// Preload data from your app server to ensure that the extension loads quickly.

extend('Checkout::PostPurchase::ShouldRender', async ({inputData, storage}) => {
  const currentMessage = await fetch(
    `${APP_URL}/api/offer`,
    {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      referenceId: inputData.initialPurchase.referenceId,
      token: inputData.token,
    }),
  })
    .then((response) => response.json());
  //console.log(postPurchaseOffer);
  storage.update(currentMessage);
  // For local development, set your upsell to always render.
  return {render: true};
});



render("Checkout::PostPurchase::Render", () => <App />);

export function App() {
  const { storage, inputData, calculateChangeset, applyChangeset, done } =
    useExtensionInput();
  const [loading, setLoading] = useState(true);
  const [calculatedPurchase, setCalculatedPurchase] = useState();

  const dataObject = JSON.parse(storage.initialData);
  const { currentMessage } = dataObject;
  const { message } = currentMessage[0]
  console.log(message);
  // const { offers } = dataObject;

  // const purchaseOption = offers[0];
  
 return (
   <BlockStack spacing="loose">
     <CalloutBanner>
       <BlockStack spacing="tight">
         <TextContainer>
           <Text size="medium" emphasized>
             { message }
           </Text>
         </TextContainer>         
       </BlockStack>
     </CalloutBanner>     
   </BlockStack>
 );
}

