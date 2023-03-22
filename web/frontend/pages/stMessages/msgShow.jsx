import { Page } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { MessagesListShow } from "../../components";

export default function MessagesShow() {
  const breadcrumbs = [{ content: "Custom Message", url: "/" }];
  const navigate = useNavigate();

  return (
    <Page>
      <TitleBar
        title="List"
         breadcrumbs={breadcrumbs}
        primaryAction={{
            content: "Create Message",
            onAction: () => navigate("/stMessages/new"),
          }}  
      />
      <MessagesListShow />
    </Page>
  );
}