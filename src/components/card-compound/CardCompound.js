import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import Icon from '@material-ui/core/Icon';

const styles = muiBaseTheme => ({
  card: {
    width: 380,
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
    }
  },
  media: {
    paddingTop: '56.25%'
  },
  content: {
    textAlign: 'left',
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: 'bold'
    // textAlign: "center"
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: 'inline-block',
    border: '2px solid white',
    '&:not(:first-of-type)': {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});

const List = ({ item }) => {
  if (item !== null) {
    return <li>{item.sname}</li>;
  }

  return null;
};

function CardPlant(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={props.image} />
        <CardContent className={classes.content}>
          <h1
            className="header-card"
            style={{
              color: '#023436',
              // fontSize: 20,
              fontFamily: 'Poppins',
              fontWeight: '600',
              // lineHeight: 26,
              wordWrap: 'break-word',
              textAlign: 'center',
              paddingBottom: 12,
              height: 'auto'
            }}
          >
            {props.name}
          </h1>
          <h6
            style={{
              margin: '0',
              color: '#023436',
              fontSize: 16,
              fontFamily: 'Poppins',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img
              src="/asset/capsule.png"
              alt="capsule"
              style={{ marginRight: '10px', height: '16px', width: 'auto' }}
            />
            Crude drugs :
          </h6>

          <ul
            className="reff"
            style={{ height: 'auto', flexDirection: 'column' }}
          >
            {props.reff.map((item, index) => {
              return (
                <li
                  key={index}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <span style={{ marginRight: '8px', height: 'auto' }}>
                    {index + 1}.
                  </span>
                  <List item={item} />
                </li>
              );
            })}
          </ul>
        </CardContent>
        <CardActions style={{ justifyContent: 'center', padding: '10px' }}>
          <Button
            href={`/detail/compound/${props.id}`}
            style={{
              width: '123',
              height: '100%',
              paddingLeft: 16,
              paddingRight: 16,
              background: '#EFF7EE',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              display: 'inline-flex',
              color: '#5FAD56',
              fontSize: 16,
              fontFamily: 'Poppins',
              fontWeight: '500'
              // lineHeight: 20,
              // wordWrap: 'break-word',
            }}
          >
            READ MORE
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(CardPlant);
