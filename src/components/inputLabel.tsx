import { TextField } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface Item {
    label: string,
    type: string,
    width: string,
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}

function InputLabel({ item }: { item: Item }) {
    return (
        <div className={"relative h-fit " + `w-${item.width}`}>
            <TextField
                label={item.label}
                className={`w-${item.width}`}
                variant="outlined"
                type={item.type}
                onChange={(e) => item.setValue(e.target.value)} />
        </div>
    );
}

export default InputLabel;