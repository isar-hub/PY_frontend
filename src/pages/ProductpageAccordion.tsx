import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

interface Product {
  name: string;
  price: number;
  stock: number;
  category: string;
  ratings: number;
  numOfReviews: number;
  description: string;
  photos: {
    url: string;
    public_id: string;
  }[];
  _id: string;
}

// Define the props type
interface ProductpageAccordionProps {
  product: Product;
}

// Update the props destructuring
export const ProductpageAccordion = ({
  product,
}: ProductpageAccordionProps) => {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={expanded === "panel1" ? <RemoveIcon /> : <AddIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontSize={15}>
              <span className="font-avenirCF font-bold">PRODUCT INFO</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize={15}>
              {product.description.split(/\r?\n/).map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>{" "}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={expanded === "panel2" ? <RemoveIcon /> : <AddIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography fontSize={15}>
              <p className="font-avenirCF font-bold">RETURN & REFUND POLICY</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p className="font-avenirCF">
                Due to the intimate nature of our products, we do not accept returns
                or exchanges for personalized items under any circumstances, unless
                there was a defect or error on our part. Due to current health
                considerations, we shall only accept returns of unused, sealed
                products. If this is the case, kindly notify us within 48 hours of
                receiving your order. Refunds will be processed within 5-10 business
                days to the original form of payment.
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={expanded === "panel3" ? <RemoveIcon /> : <AddIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography fontSize={15} className="font-avenirCF">
              <p className="font-avenirCF font-bold">SHIPPING INFO</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p className="font-avenirCF">
                Our goal is to process and dispatch the orders fairly quickly.
                Transit time is between 3-6 business days after being shipped,
                depending on the location and complexity of the order placed. Kindly
                also note that we do not take responsibility for delays as a result
                of external conditions or shipping entities.
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
