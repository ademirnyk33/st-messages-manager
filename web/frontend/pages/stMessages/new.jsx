import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { CustomMessageCard } from "../../components";

export default function ManageCode() {
  const breadcrumbs = [{ content: "Custom messasge", url: "/" }];

  return (
    <Page>
      <TitleBar
        title="Create new message"
        breadcrumbs={breadcrumbs}
        primaryAction={null}
      />
      <CustomMessageCard />
    </Page>
  );
}