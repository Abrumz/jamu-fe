import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

function Step1(props) {
  if (props.activeStep !== 0) {
    return null;
  }
  return (
    <Paper
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '50%',
        minHeight: '400px'
        // backgroundColor: '#f8f8f8'
      }}
    >
      <FormControl component="fieldset">
        <FormLabel
          component="legend"
          style={{
            color: 'var(--Text-tx_normal, #023436)',
            fontFamily: 'Poppins',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '23px',
            marginBottom: '48px'
          }}
        >
          Select approach :
        </FormLabel>

        <RadioGroup
          value={props.type}
          aria-label="Approach"
          name="type"
          onChange={props.handleChange}
        >
          <FormControlLabel
            value="crude"
            control={<Radio />}
            label="Crude Drug"
            style={{
              color: 'var(--Text-tx_normal, #023436)',
              fontFamily: 'Poppins',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '23px'
            }}
          />
          <FormControlLabel
            value="compound"
            control={<Radio />}
            label="Compound"
            style={{
              color: 'var(--Text-tx_normal, #023436)',
              fontFamily: 'Poppins',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '23px'
            }}
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}

export default Step1;
