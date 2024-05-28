import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import logo from './crude-drugs.png';
// import logoCrudeDrugs from "/assets/crude-drugs.png"

import Icon from '@material-ui/core/Icon';
// import imgNotFound from './img-not-found.png';
const styles = muiBaseTheme => ({
  card: {
    width: 402,
    height: 450,
    margin: 'auto',
    transition: '0.3s'
  },
  media: {
    paddingTop: '200px'
  },
  // tulisan crude drugs
  content: {
    textAlign: 'left'
    // padding: muiBaseTheme.spacing.unit * 2,
  },
  heading: {
    fontWeight: 'bold'
  },
  subheading: {
    lineHeight: 1.8
  }
});

const List = ({ item, modalCrude, id }) => {
  if (item.sname !== '') {
    return <li onClick={modalCrude.bind(this, item.idcrude)}>{item.sname}</li>;
  }

  return null;
};

function CardPlant(props) {
  const { classes } = props;
  console.log('CardPlant props:', props);
  return (
    <div>
      {/* <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "20px" }}> */}
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={props.image} />
        <CardContent className={classes.content}>
          <h5
            className="header-card"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
              marginBottom: '16px',
              paddingRight: '0px',
              fontSize: '20px',
              marginTop: '-0px'
            }}
          >
            {props.name}
          </h5>
          {/* Crude Drugs card */}
          <h6
            style={{
              margin: '0',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              fontSize: '16px'
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '20px',
                marginTop: '0px',
                marginRight: '10px',
                marginLeft: '12px'
              }}
            />
            Crude drugs
          </h6>
          <ul
            className="reff"
            style={{
              paddingBottom: '0px',
              marginBottom: '0px',
              marginLeft: '42px'
              // backgroundColor:"#000"
            }}
          >
            {props.reff.slice(0, 3).map((item, index) =>
              item.sname !== '' ? (
                <li key={index} onClick={() => props.modalCrude(item.idcrude)}>
                  {index + 1}. {item.sname}
                </li>
              ) : null
            )}
          </ul>
        </CardContent>
        {/* read more */}
        <CardActions>
          <Button
            href={`/plant/${props.id}`}
            style={{
              fontWeight: '500',
              margin: '-5px 0px 10.5px 20px',
              fontSize: '16px',
              backgroundColor: '#EFF7EE',
              color: '#5FAD56'
            }}
          >
            Read More
            {/* <Icon>chevron_right_rounded</Icon> */}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(CardPlant);
