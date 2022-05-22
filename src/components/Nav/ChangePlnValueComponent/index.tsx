import React, { useState } from "react";
import { ChangePriceBox, Button } from "./style";
import { Input } from "../../AppContent/style";
import { useDispatch } from "react-redux";
import { changePlnPrice } from "../../../actions/plPriceAction";

const ChangePlnValueComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [plnPriceFromInput, setPlnPriceFromInput] = useState<
    number | undefined
  >(undefined);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlnPriceFromInput(+e.target.value);
  };

  const changePlnPriceFn = (value: number | undefined) => {
    if (!value || value < 1) return;
    dispatch(changePlnPrice(value));
  };

  return (
    <ChangePriceBox>
      <Input
        type="number"
        placeholder="Change PLN value"
        min="1"
        value={plnPriceFromInput}
        onChange={handleOnChange}
      />

      <Button onClick={() => changePlnPriceFn(plnPriceFromInput)}>
        Change
      </Button>
    </ChangePriceBox>
  );
};

export default ChangePlnValueComponent;
