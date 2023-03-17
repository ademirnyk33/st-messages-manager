import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { MessagesListShow } from "../../components";

export default function MessagesShow() {
  const breadcrumbs = [{ content: "Messages", url: "/" }];

  return (
    <Page>
      <TitleBar
        title="Messages"
         breadcrumbs={breadcrumbs}
        primaryAction={{
            content: "Create Message",
            onAction: () => null,
          }}  
      />
      <MessagesListShow />
    </Page>
  );
}