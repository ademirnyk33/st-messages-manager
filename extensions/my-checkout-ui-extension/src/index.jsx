import React from 'react';
import {
  useExtensionApi,
  render,
  Banner,
  useTranslate 
} from '@shopify/checkout-ui-extensions-react';

// Set the entry points for the extension
render("Checkout::Dynamic::Render", () => <App />);
//render("Checkout::DeliveryAddress::RenderBefore", () => <App />);
function App() {
  // const {title, description, collapsible, status: merchantStatus} = useSettings();
  // const status = merchantStatus ?? 'info';
  console.log("Checkput");
  // const {extensionPoint} = useExtensionApi();
  // const translate = useTranslate();
  return (
    <Banner>
      Hello World!
    </Banner>
  );
}