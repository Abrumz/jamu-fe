import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ButtonCard from './ButtonCard';

import FormControl from '@material-ui/core/FormControl';
import logo from '../../logo-hijau.png';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '650px'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10,
    backgroundColor: 'rgb(137, 177, 67)',
    color: '#FFF',
    borderRadius: '0'
  }
};

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      inputSearch: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      if (this.state.inputSearch === '') {
        window.location.href = '/';
      } else {
        window.location.href = `/search/${this.state.inputSearch}`;
      }
    }
  }

  handleClick() {
    if (this.state.inputSearch === '') {
      window.location.href = '/';
    } else {
      window.location.href = `/search/${this.state.inputSearch}`;
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { classes } = this.props;
    const images = [
      {
        url: '/asset/herbsmed-2.png',
        title: 'Herbal Medicine',
        directory: '/herbmeds'
      },
      {
        url: '/asset/plant-2.png',
        title: 'Plant',
        directory: '/plant'
      },
      {
        url: '/asset/compound-2.png',
        title: 'Compound',
        directory: '/compound'
      },
      {
        url: '/asset/comparision-2.png',
        title: 'Comparison',
        directory: '/compare'
      },
      {
        url: '/asset/prediction-2.png',
        title: 'Prediction',
        directory: '/predict'
      },
      // {
      //   url: "/asset/tacit.jpeg",
      //   title: "Tacit Knowledge",
      //   directory: "/tacit"
      // },
      {
        url: '/asset/explicit-2.png',
        title: 'Knowledge',
        directory: '/knowledge'
      },
      {
        url: '/asset/plant_ethnic-2.png',
        title: 'Map Ethnic',
        directory: '/map/ethnic'
      }
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#ffff',
            alignItems: 'center',
            backgroundImage: `url(/asset/bg-homepage.png)`,
            backgroundSize: 'cover'
          }}
        >
          <h3
            style={{
              display: 'flex',
              textAlign: 'center',
              fontSize: '3.0em',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '750',
              margin: '100px 0 20px 0',
              padding: '0px 400px 0px 400px',
              color: 'black'
            }}
          >
            {' '}
            Knowledge Management System Jamu{' '}
          </h3>
          <h3
            style={{
              display: 'flex',
              textAlign: 'center',
              fontSize: '1.5em',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '300',
              margin: '10px 0 50px 0',
              color: 'black'
            }}
          >
            {' '}
            You can explore all about herbal medicine here{' '}
          </h3>

          <Paper
            square={false}
            className={classes.root}
            elevation={1}
            style={{ borderRadius: 25, Width: '650px' }}
          >
            <FormControl className={classes.margin}></FormControl>
            <InputBase
              autoFocus
              className={classes.input}
              name="inputSearch"
              value={this.state.inputSearch}
              onKeyDown={this.handleKeyDown}
              onChange={this.handleInputChange}
              placeholder="Search all here"
              inputProps={{ style: { fontFamily: 'Poppins, sans-serif' } }}
            />
            <IconButton
              onClick={this.handleClick}
              // className={classes.iconButton}
              aria-label="Search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>

          <h3
            style={{
              textAlign: 'center',
              fontSize: '1em',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '400',
              margin: '20px 0 100px 0',
              color: 'black'
            }}
          >
            Examples: cough, pegal linu, curcuma, etc.
          </h3>
        </div>

        <div>
          <h3
            style={{
              textAlign: 'center',
              fontSize: '2em',
              fontStyle: 'normal',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '600',
              margin: '30px 0 0px 0',
              color: 'black'
            }}
          >
            {' '}
            What you’re looking for?{' '}
          </h3>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffff',
            margin: '30px 50px 30px 50px',
            padding: '0 0 25px 0'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))',
              gridGap: '5rem'
            }}
          >
            {images.map(image => {
              return <ButtonCard image={image} />;
            })}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffff',
            margin: '30px 50px 30px 50px'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '800px',
              minWidth: '300px',
              color: 'black',
              marginTop: '30px',
              marginBottom: '30px'
            }}
          >
            <h3
              style={{
                textAlign: 'center',
                fontSize: '2em',
                fontWeight: '600',
                margin: '0 0 3vh 0',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              {' '}
              What is KMS Jamu ?{' '}
            </h3>
            <div
              style={{
                fontSize: '1em',
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'justify',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400',
                margin: '0 0 3vh 0',
                padding: '0px 0px 30px 0px'
              }}
            >
              Knowledge Management System Jamu (KMS Jamu) is a web application
              for sharing knowledge about herbs, herbal plants, comparing herbal
              formulas, predicting the efficacy of several plants and compounds,
              and other information relating to herbs.
            </div>
            {/* <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse'
              }}
            >
              <img
                style={{
                  marginBottom: '20px'
                }}
                src={logo}
                alt="Logo"
              />
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
