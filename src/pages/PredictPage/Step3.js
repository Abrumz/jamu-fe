import React from 'react';
import { Paper, Typography } from '@material-ui/core';

function Step3(props) {
  if (props.activeStep !== 2) {
    return null;
  }
  return (
    <React.Fragment>
      {props.loadPredict ? (
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
          <Typography>loading...</Typography>
        </Paper>
      ) : (
        <Paper
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            width: '50%',
            minHeight: '400px'
            // backgroundColor: '#f8f8f8'
          }}
        >
          <h3>Summary</h3>
          <Paper
            style={{
              padding: '20px',
              backgroundColor: 'white'
            }}
          >
            <table>
              <tr>
                <td
                  style={{
                    color: 'var(--Text-tx_normal, #023436)',
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '20px'
                  }}
                >
                  Type of Prediction
                </td>
                <td>:</td>
                <td>
                  <span>{props.type}</span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    color: 'var(--Text-tx_normal, #023436)',
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '20px'
                  }}
                >
                  Type of Method
                </td>
                <td>:</td>
                <td>
                  <span>{props.model}</span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    verticalAlign: 'top',
                    color: 'var(--Text-tx_normal, #023436)',
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '20px'
                  }}
                >{`Selected ${props.type}`}</td>
                <td
                  style={{
                    verticalAlign: 'top'
                  }}
                >
                  :
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    verticalAlign: 'top'
                  }}
                >
                  <ul
                  // style={{
                  //   margin: 0,
                  //   marginLeft: 5,
                  //   padding: 0,
                  //   paddingLeft: 12
                  // }}
                  >
                    {props.target.map(dt => (
                      <li key={dt.sname}>{dt.sname}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </table>
          </Paper>
        </Paper>
      )}
    </React.Fragment>
  );
}

export default Step3;
