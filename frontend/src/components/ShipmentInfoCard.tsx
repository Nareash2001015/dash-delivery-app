/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from "@chakra-ui/react";
import { ShipmentCardProps } from "../types";

const ShipmentInfoCard: React.FC<ShipmentCardProps> = ({ shipmentInfo }) => {
  const steps = [
    { title: "pending" },
    { title: "in transit" },
    { title: "delivered" },
  ];
  function getIndex(): number | undefined{
    if (shipmentInfo.shipmentStatus === "pending") {
      return 1;
    } else if (shipmentInfo.shipmentStatus === "in transit") {
      return 2;
    } else {
      return 3;
    }
  }

  const { activeStep, setActiveStep } = useSteps({
    index: getIndex(),
    count: steps.length,
  });
  return (
    <Card maxW="md">
      <CardBody>
        <Heading size="md">Sender address</Heading>
        <Text py="2">{shipmentInfo.user.address}</Text>
        <Heading size="md">Recipient address</Heading>
        <Text py="2">{shipmentInfo.recipientAddress}</Text>
        <Heading size="md">Package description</Heading>
        <Text py="2">{shipmentInfo.packageDescription}</Text>
        <Heading size="md">Package weight</Heading>
        <Text py="2">{shipmentInfo.packageWeight}</Text>
        <Heading size="md">Shipment status</Heading>
        <Stepper size="sm" index={activeStep} className="mt-10">
          {steps.map((step, index) => (
            <Step
              key={index}
              onClick={() => {
                setActiveStep(index);
              }}
            >
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Box flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
              </Box>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </CardBody>
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      ></CardFooter>
    </Card>
  );
};

export default ShipmentInfoCard;
