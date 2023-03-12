import { useState, useCallback } from "react";
import {
  Card,
  Heading,
  TextContainer,
  DisplayText,
  TextStyle,
  Form,
  FormLayout,
  TextField,
  Checkbox,
  DatePicker,
  Button
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";


export function CustomMessageCard() {
  const emptyToastProps = { content: null };
  // const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  // const fetch = useAuthenticatedFetch();

 /*  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/products/count",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  }); */

  const toastMarkup = toastProps.content && !isRefetchingCount && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );


  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({month, year}),
    [],
  );
  const [messageToShow, setValue] = useState('Gracias por su compra.');
  const handleMessageChange = useCallback((newValue) => setValue(newValue), []);

  const handleSubmit = useCallback((_event) => {
    console.log(messageToShow);
    /* setEmail('');
    setNewsletter(false); */
  }, []);


  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>

      <TextField
          value={null}
          onChange={ handleMessageChange }
          label="Message to show"
          // type="email"
          // autoComplete="email"
          helpText={
            <span>
              This message will show in the confirmation page.
            </span>
          }
        />
        <Checkbox
          label="Bold"
          checked={null}
          onChange={null}
        />
        <Checkbox
          label="Italic"
          checked={null}
          onChange={null}
        />
        <div className="container">
          <div>
            <TextField
              value={null}
              onChange={null}
              label="Start date"
              type="date"
              // autoComplete="email"
              helpText={
                <span>
                  Use this to speficy when the message begin to diplay.
                </span>
              }
            />
            </div>
            <div>
            <TextField
              value={null}
              onChange={null}
              label="End date"
              type="date"
              // autoComplete="email"
              helpText={
                <span>
                  Use this to speficy when the message end to diplay.
                </span>
              }
            />
            </div>
        </div>
        <Button submit>Create</Button>
      </FormLayout>
    </Form>
  );
}
