import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import companyLogo from './company-icon.png';
import efficacyLogo from './efficacy-icon.png';
import crudeLogo from './crude-icon.png';

const styles = muiBaseTheme => ({
  card: {
    width: 320,
    minHeight: 450,
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: '0.3s',
    boxShadow: '0 4px 20px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 8px 35px -12.125px rgba(0,0,0,0.3)'
    }
  },
  media: {
    paddingTop: '56.25%'
  },
  content: {
    textAlign: 'left',
    padding: muiBaseTheme.spacing(3),
    flex: 1
  },
  divider: {
    margin: `${muiBaseTheme.spacing(3)}px 0`
  },
  heading: {
    fontWeight: 'bold',
    height: '35px'
  },
  subheading: {
    height: '50px'
  },
  avatar: {
    display: 'inline-block',
    border: '2px solid white',
    '&:not(:first-of-type)': {
      marginLeft: -muiBaseTheme.spacing(1)
    }
  },
  efficacy: {
    height: '60px'
  },
  reff: {
    listStyleType: 'decimal',
    paddingLeft: '15px',
    margin: '10px 0'
  },
  listItem: {
    marginBottom: '5px',
    fontSize: '15px',
    color: 'black'
  },
  clampedText: {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    marginTop: '4px',
    marginBottom: '10px',
    color: 'black',
    textAlign: 'justify',
    fontSize: '15px'
  }
});

const List = ({ item, modalCrude, id, classes }) => {
  if (item.sname !== '') {
    return (
      <li className={classes.listItem} onClick={() => modalCrude(item.idcrude)}>
        {item.sname}
      </li>
    );
  }

  return null;
};

function CardHerbMed(props) {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <h1
            className="header-card"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              textAlign: 'center',
              marginTop: '-5px',
              marginBottom: '15px',
              marginLeft: '20px',
              color: 'black'
            }}
          >
            {props.name}
          </h1>

          <h6
            style={{
              margin: '0',
              color: 'black',
              fontSize: '16px'
            }}
          >
            <img
              src={companyLogo}
              alt="Company Logo"
              className={classes.companyLogo}
              style={{ marginRight: '10px' }}
            />
            Company
          </h6>
          <p
            style={{
              color: 'black',
              margin: 0,
              marginTop: '4px',
              marginBottom: '10px',
              fontSize: '15px'
            }}
            className="block-with-text"
          >
            {props.company}
          </p>
          <h6
            style={{
              margin: '0',
              color: 'black',
              marginTop: '9px',
              fontSize: '16px'
            }}
          >
            <img
              src={efficacyLogo}
              alt="Efficacy Logo"
              className={classes.efficacyLogo}
              style={{ marginRight: '10px' }}
            />
            Efficacy
          </h6>
          <p className={classes.clampedText}>{props.efficacy}</p>
          <h6
            style={{
              margin: '0',
              color: 'black',
              fontSize: '16px'
            }}
          >
            <img
              src={crudeLogo}
              alt="Crude Drugs Logo"
              className={classes.crudeLogo}
              style={{ marginRight: '10px' }}
            />
            Crude drugs
          </h6>
          <ul className={classes.reff}>
            {props.reff.slice(0, 3).map((item, index) => (
              <List
                key={index}
                item={item}
                modalCrude={props.modalCrude}
                classes={classes}
              />
            ))}
          </ul>
        </CardContent>
        <CardActions>
          <Button
            href={`/herbsmed/${props.id}`}
            style={{
              fontSize: '15px',
              fontWeight: 'bold',
              color: '#5FAD56',
              backgroundColor: '#EFF7EE',
              padding: '10px'
            }}
          >
            Read More
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default withStyles(styles)(CardHerbMed);
