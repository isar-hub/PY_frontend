import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
              <span className="font-avenirCF font-medium">PRODUCT INFO</span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize={15}>{product.description}</Typography>
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
              <p className="font-avenirCF font-medium">
                RETURN & REFUND POLICY
              </p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p className="font-avenirCF">
                I’m a Return and Refund policy. I’m a great place to let your
                customers know what to do in case they are dissatisfied with
                their purchase. Having a straightforward refund or exchange
                policy is a great way to build trust and reassure your customers
                that they can buy with confidence.
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
              <p className="font-avenirCF font-medium">SHIPPING INFO</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <p className="font-avenirCF">
                I'm a shipping policy. I'm a great place to add more information
                about your shipping methods, packaging and cost. Providing
                straightforward information about your shipping policy is a
                great way to build trust and reassure your customers that they
                can buy from you with confidence.
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
