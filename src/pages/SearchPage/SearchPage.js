import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';

import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';

import CardHerbMed from '../../components/card-herbmed/CardHerbMed';
import Card from '../../components/card-plant/card';
import Icon from '@material-ui/core/Icon';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark';
import DateRange from '@material-ui/icons/DateRange';
import Divider from '@material-ui/core/Divider';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ModalCrude from '../../components/modal-crude/ModalCrude';

import { Grid } from '@material-ui/core';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Poppins, sans-serif',
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  }
};

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: '12px 24px 12px 24px' }}>
      {props.children}
    </Typography>
  );
}

function ListExplicit(props) {
  return (
    <div
      style={{
        maxWidth: '85%',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <h1
        style={{
          color: 'black',
          fontWeight: '600',
          fontSize: '28px',
          fontStyle: 'normal',
          lineHeight: '38px',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        {props.title}
      </h1>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="caption" style={{ fontFamily: 'Poppins' }}>
            <Person /> {props.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption" style={{ fontFamily: 'Poppins' }}>
            <CollectionsBookmark /> Conference paper
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="caption" style={{ fontFamily: 'Poppins' }}>
            <DateRange /> 12-12-2001
          </Typography>
        </Grid>
        <Grid item>
          <p className="block-with-text">{props.abstract}</p>
        </Grid>
        <Grid item>
          <Button href={`/explicit/${props.id}`}>
            Read More <Icon>chevron_right_rounded</Icon>
          </Button>
        </Grid>
        <Grid item>
          <Divider light />
        </Grid>
      </Grid>
    </div>
  );
}

// function ListTacit(props) {
//   return (
//     <div
//       style={{
//         marginTop: '25px'
//       }}
//     >
//       <Typography
//         variant="subtitle1"
//         style={{
//           color: '#1976d8'
//         }}
//       >
//         <Link to={`/tacit/${props.id}`}>{props.title}</Link>
//       </Typography>
//       <Typography variant="caption">
//         <Person /> {props.name}
//       </Typography>
//       {/* <Typography variant="caption">
//         <CollectionsBookmark /> Conference paper <DateRange /> 12-12-2001
//       </Typography>
//       <p className="block-with-text">{props.abstract}</p> */}
//     </div>
//   );
// }

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      loading: true,
      onSearch: false,
      inputSearch: '',
      plan: [],
      herbsmed: [],
      tacit: [],
      explicit: [],
      snackbar: {
        open: false,
        success: false,
        message: ''
      },
      onSelect: null,
      modal: {
        open: false,
        id: ''
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getDataSearch = this.getDataSearch.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
    this.modalCrude = this.modalCrude.bind(this);
  }

  async componentDidMount() {
    const { query } = this.props.match.params;
    await this.setState({
      inputSearch: query
    });
    this.getDataSearch();
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
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

  async getDataSearch() {
    this.setState({
      loadData: true,
      onSearch: true
    });

    const urlSearchPlant = '/jamu/api/plant/search';
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const resPlant = await Axios.get(
      urlSearchPlant,
      {
        params: {
          search: this.state.inputSearch
        }
      },
      axiosConfig
    );
    const dataPlant = await resPlant.data.data;

    const urlSearchHerbsMed = '/jamu/api/herbsmed/search';
    const resHerbsMed = await Axios.get(
      urlSearchHerbsMed,
      {
        params: {
          search: this.state.inputSearch
        }
      },
      axiosConfig
    );
    const dataHerbsMed = await resHerbsMed.data.data;

    const UrlTacit = '/jamu/api/tacit/search/sort/';
    const resTacit = await Axios.get(
      UrlTacit,
      {
        params: {
          search: this.state.inputSearch
        }
      },
      axiosConfig
    );
    const dataTacit = await resTacit.data.data;

    const urlExplicit = '/jamu/api/explicit/search/sort/';
    const resExplicit = await Axios.get(
      urlExplicit,
      {
        params: {
          search: this.state.inputSearch
        }
      },
      axiosConfig
    );
    const dataExplicit = await resExplicit.data.data;

    this.setState({
      plan: dataPlant,
      herbsmed: dataHerbsMed,
      tacit: dataTacit,
      explicit: dataExplicit
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  async modalCrude(id) {
    this.setState({
      modal: {
        open: true,
        id: id
      }
    });
  }

  closeBtn() {
    this.setState({
      snackbar: {
        open: false,
        success: false,
        message: ''
      },
      modal: {
        open: false
      }
    });
  }
  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        {/* <div
          style={{
            marginTop: '3px',
            width: '100%',
            height: '150px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: `url(/asset/bg-kecil.png)`,
            backgroundSize: 'cover'
          }}
        >
          <Paper className={classes.root} elevation={1}>
            <InputBase
              className={classes.input}
              name="inputSearch"
              value={this.state.inputSearch}
              onChange={this.handleInputChange}
              onKeyDown={this.handleKeyDown}
              placeholder="Search here..."
            />
            <IconButton
              className={classes.iconButton}
              href={`/search/${this.state.inputSearch}`}
              aria-label="Search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Poppins, sans-serif',
            margin: '30px 0 0 0'
          }}
        >
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            centered
            indicatorColor="#5FAD56"
            textColor="black"
          >
            <Tab
              disabled={this.state.herbsmed.length === 0}
              label={`Herbal Medicine (${this.state.herbsmed.length})`}
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: this.state.value === 0 ? '#5FAD56' : 'black'
              }}
            />
            <Tab
              disabled={this.state.plan.length === 0}
              label={`Plant (${this.state.plan.length})`}
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: this.state.value === 1 ? '#5FAD56' : 'black'
              }}
            />
            <Tab
              disabled={this.state.explicit.length === 0}
              label={`Knowledge (${this.state.explicit.length})`}
              style={{
                fontFamily: 'Poppins, sans-serif',
                color: this.state.value === 2 ? '#5FAD56' : 'black'
              }}
            />
            {/* <Tab
              disabled={this.state.tacit.length === 0}
              label={`Tacit Knowledge (${this.state.tacit.length})`}
            /> */}
          </Tabs>
          <hr />
          {this.state.value === 0 && (
            <div
              style={{
                display: 'flex',
                gridGap: '56px',
                flexWrap: 'wrap',
                flexDirection: 'colomn',
                justifyContent: 'center',
                alignItems: 'flex-start',
                margin: '20px 0 30px 0'
              }}
            >
              {this.state.herbsmed.map(item => (
                <CardHerbMed
                  key={item.idherbsmed}
                  id={item.idherbsmed}
                  name={item.name}
                  efficacy={item.efficacy}
                  reff={item.refCrude}
                  modalCrude={this.modalCrude}
                  company={item.refCompany && item.refCompany.cname}
                />
              ))}
            </div>
          )}
          {this.state.value === 1 && (
            <TabContainer>
              <div
                style={{
                  display: 'flex',
                  gridGap: '56px',
                  flexWrap: 'wrap',
                  flexDirection: 'colomn',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  margin: '20px 0 0 0'
                }}
              >
                {this.state.plan.map(item => (
                  <Card
                    key={item.id}
                    id={item.idplant}
                    name={item.sname}
                    image={item.refimg}
                    reff={item.refCrude}
                    modalCrude={this.modalCrude}
                  />
                ))}
              </div>
            </TabContainer>
          )}
          {this.state.value === 2 && (
            <TabContainer>
              <div
                style={{
                  display: 'flex',
                  gridGap: '56px',
                  flexWrap: 'wrap',
                  flexDirection: 'colomn',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  margin: '0 0 20px 0'
                }}
              >
                {this.state.explicit.map(item => (
                  <ListExplicit
                    key={item._id}
                    id={item._id}
                    name={item.firstName + ' ' + item.lastName}
                    title={item.title}
                    abstract={item.abstract}
                  />
                ))}
              </div>
            </TabContainer>
          )}
          {/* {this.state.value === 3 && (
            <TabContainer>
              <div
                style={{
                  minHeight: '270px',
                  width: '90%',
                  margin: 'auto',
                  marginTop: '9px'
                }}
              >
                {this.state.tacit.map(item => (
                  <ListTacit
                    key={item._id}
                    id={item._id}
                    name={item.firstName + ' ' + item.lastName}
                    title={item.title}
                    abstract={item.abstract}
                  />
                ))}
              </div>
            </TabContainer>
          )} */}
          {this.state.modal.open === true ? (
            <ModalCrude modal={this.state.modal} close={this.closeBtn} />
          ) : null}
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchPage);
