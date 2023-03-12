import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
  TextField,
} from "@shopify/polaris";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import {Redirect} from '@shopify/app-bridge/actions';
import { trophyImage } from "../assets";

import { ProductsCard, CustomMessageCard } from "../components";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Page narrowWidth>
      <TitleBar 
        title="Custom Message" 
        primaryAction={{
          content: "Create Message",
          onAction: () => navigate("/stMessages/new"),
        }} />
      <Layout>
        <Layout.Section>

          <Card 
            title="Wellcome"
            sectioned
            primaryFooterAction={{
              content: "Create Message",
              onAction: () => navigate("/stMessages/new"),
            }}
          >
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>It's time to say thanks, in a better way! 🎉</Heading>
                  <p>
                  Welcome to the custom thanking Messaging, this App help you to set a custom greeting Messaging. 
                  It's simple set a new message and you will be able to see the history Messaging.
                  </p>
                  <p>
                    Ready to go? Start clicking the buttom "Create a new message". In this option you can set the message, date to the message appear and whe it will be desactivate.{" "}
                  </p>

                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt="Nice work on building a Shopify app"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <ProductsCard />
        </Layout.Section>
      </Layout>
    </Page>

  );
}
