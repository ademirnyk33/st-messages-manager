import { Page } from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { CustomMessageCard } from "../../components";

export default function ManageCode() {
  const breadcrumbs = [{ content: "Custom message", url: "/" }];
  const navigate = useNavigate();

  return (
    <Page>
      <TitleBar
        title="Create new message"
        breadcrumbs={breadcrumbs}
        primaryAction={{
          content: "Messages List",
          onAction: () => navigate("/stMessages/msgShow"),
        }}
        // secondaryActions={[
        //   {
        //     content: "Messages List",
        //     onAction: () => navigate("/stMessages/msgShow"),
        //   },
        // ]}
        /* breadcrumbs={breadcrumbs}
        primaryAction={{
            content: "Create Message",
            onAction: () => null,
          }}  */
      />
      <CustomMessageCard />
    </Page>
  );
}