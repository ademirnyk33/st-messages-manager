import { Page } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { MessagesListShow } from "../../components";

export default function MessagesShow() {
  const breadcrumbs = [{ content: "Messages", url: "/" }];
  // const fillRows = useCallback((_event) => {
  //   console.log("Fill");
  //   (async () => {
  //       try{
  //       const response = await fetch("/api/stMessages", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //       }); 
  //       const respEnd = await response.json();
  //       console.log(respEnd);
    
  //   } catch (error) {
  //       console.error(error);
  //       res.status(500).send(error.message);
  //     }

  //     })();
  //     return { status: "success" };

  //   }, []);
  //   console.log(fillRows);

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