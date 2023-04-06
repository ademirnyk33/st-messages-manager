import ReactDOM from "react-dom";
import { getSessionToken } from '@shopify/app-bridge-utils';
import App from "./App";
import createApp from '@shopify/app-bridge';

const config = {
  // The client ID provided for your application in the Partner Dashboard.
  apiKey: process.env.SHOPIFY_API_KEY, // "c18726c4d7ecc8e5d9fab088501659e2",
  // The host of the specific shop that's embedding your app. This value is provided by Shopify as a URL query parameter that's appended to your application URL when your app is loaded inside the Shopify admin.
  host: new URLSearchParams(location.search).get("host"),
  forceRedirect: true
};

const app = createApp(config);
const token = await getSessionToken(app);
localStorage.setItem("appToken", token);
ReactDOM.render(<App />, document.getElementById("app"));
