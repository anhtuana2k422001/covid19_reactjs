import { FormControl, InputLabel, NativeSelect, FormHelperText, makeStyles } from '@material-ui/core';
import React from "react";
import { withStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((them) => ({
    formControl: {
        margin: `${them.spacing(3)} px 0`,
    }
}))

// xét màu
const MyNativeSelect = withStyles({
    icon: {
      color: "white"
    }
  })(NativeSelect);


export default function CountrySelector({ value, handleOnChange, countries}){

    const style = useStyles();
    return (
        <FormControl className={style.formControl}>
            <InputLabel style={{color: 'White'}}  htmlFor="country-selector" shrink >Quốc gia </InputLabel>
            <MyNativeSelect
            style={{color: 'white', borderBottom: 'double'}}
            value={value}
            onChange = {handleOnChange}
            inputProps={{
                name: 'country',
                id: 'country-selector',
            }}
            >
            {countries.map((country) =>{
                return (
                    <option style={{color: 'black'}} key={country.ISO2} value={country.ISO2.toLowerCase()}>
                        {country.Country}
                    </option>
                    );
                })}
            </MyNativeSelect>
            <FormHelperText style={{color: 'White'}} >Lựa chọn quốc gia</FormHelperText>
        </FormControl>
    );
}