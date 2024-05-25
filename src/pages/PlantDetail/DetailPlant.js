import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardCompound from '../../components/card-compound/CardCompound';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Spinner from '../../components/Spinner/Spinner';

import SnackBar from '../../components/snackbar/SnackBar';
import ErorPage from '../ErrorPage/ErorPage';

import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

import CardHerbMed from '../../components/card-herbmed/CardHerbMed';
import ModalCrude from '../../components/modal-crude/ModalCrude';

import homeLogo from './home-icon.png';
import plantLogo from './plant-icon.png';
import load from './not-found.png';

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    // backgroundColor: '#fff',
    backgroundColor: theme.palette.grey[100],
    height: 24,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300]
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip);

const styles = theme => ({
  avatar: {
    background: 'none',
    marginRight: -theme.spacing(1.5)
  },
  tabs: {
    color: '#5FAD56',
    backgroundColor: 'white'
  },
  tab: {
    // color: "#5FAD56",
    // "&:hover": {
    //   color: "#4a8b44",
    // },
    color: 'black',
    '&:hover': {
      color: 'green'
    },
    '&$selected': {
      color: 'green'
    }
  },

  indicator: {
    backgroundColor: '#5FAD56',
    color: '#5FAD56'
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
    paddingTop: '30px'
  },
  cardItem: {
    flex: '1 1 calc(33.333% - 20px)', // Mengatur agar ada 3 kartu per baris dengan gap 20px
    maxWidth: 'calc(33.333% - 20px)',
    boxSizing: 'border-box'
  }
});
function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

class CustomTabs extends Component {
  state = {
    value: 0
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
}

class DetailPlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // compounds: [],
      value: 0,
      detailPlant: [],
      loading: true,
      loadData: false,
      snackbar: {
        open: false,
        success: false,
        message: ''
      },
      modal: {
        open: false,
        id: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.afterUpdate = this.afterUpdate.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
    this.modalCrude = this.modalCrude.bind(this);
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });
    await this.getData();
  }

  async getData() {
    try {
      const { id } = this.props.match.params;
      const url = '/jamu/api/plant/get/' + id;
      const res = await Axios.get(url);
      const { data } = await res;
      // const urlDesc = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&titles='+ data.data.sname;
      // const resDesc = await Axios.get(urlDesc,{ headers: {'Access-Control-Allow-Origin': "*"} });
      let HerbMed = [];
      let efficacy = [];
      let name_en = [];
      let name_loc1 = [];
      let name_loc2 = [];
      let ref = [];
      let RefCrude = await Promise.all(
        data.data.refCrude.map(async dt => {
          let urlCrude = '/jamu/api/crudedrug/get/' + dt.idcrude;
          let resCrude = await Axios.get(urlCrude);
          let { data } = await resCrude;
          data.data.refHerbsMed.forEach(dt => {
            if (!HerbMed.includes(dt.idherbsmed)) {
              HerbMed.push(dt.idherbsmed);
            }
          });
          if (!efficacy.includes(data.data.effect)) {
            efficacy.push(data.data.effect);
          } else if (data.data.effect_loc !== '') {
            if (!efficacy.includes(data.data.effect_loc)) {
              efficacy.push(data.data.effect_loc);
            }
          }

          if (!name_en.includes(data.data.name_en)) {
            name_en.push(data.data.name_en);
          }

          if (!name_loc1.includes(data.data.name_loc1)) {
            name_loc1.push(data.data.name_loc1);
          }

          if (!name_loc2.includes(data.data.name_loc2)) {
            name_loc2.push(data.data.name_loc2);
          }
          if (!ref.includes(data.data.ref)) {
            ref.push(data.data.ref);
          }

          return data.data;
        })
      );

      let RefHerbsMed = await Promise.all(
        HerbMed.map(async dt => {
          let urlCrude = '/jamu/api/herbsmed/get/' + dt;
          let resCrude = await Axios.get(urlCrude);
          let { data } = await resCrude;
          return data.data;
        })
      );

      let detailPlant = data.data;
      detailPlant.refCrude = RefCrude;
      detailPlant.refHerbsMed = RefHerbsMed;
      detailPlant.efficacy = efficacy;
      detailPlant.name_en = name_en;
      detailPlant.name_loc1 = name_loc1;
      detailPlant.name_loc2 = name_loc2;
      detailPlant.ref = ref;
      this.afterUpdate(data.success, data.message);
      this.setState({
        detailPlant: detailPlant,
        loading: false
      });
    } catch (err) {
      this.afterUpdate(false, err.message);
      this.setState({
        onEror: true,
        loading: false
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  async afterUpdate(success, message) {
    this.setState({
      snackbar: {
        open: true,
        success: success,
        message: message
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

  async modalCrude(id) {
    this.setState({
      modal: {
        open: true,
        id: id
      }
    });
  }

  render() {
    const { classes } = this.props;
    // const noDataImage = "./not-found.png";
    return (
      <div>
        {this.state.onEror ? (
          <ErorPage />
        ) : this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <Paper
              style={{
                width: '85%',
                margin: 'auto',
                marginTop: '80px',
                marginBottom: '30px',
                padding: '15px',
                display: 'flex'
              }}
              elevation={1}
            >
              <div
                style={{
                  width: '50%'
                }}
              >
                <Typography>
                  Detail Plant {this.state.detailPlant.sname}
                </Typography>
              </div>
              <div
                style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'row-reverse'
                }}
              >
                <Breadcrumbs aria-label="breadcrumb">
                  <StyledBreadcrumb
                    component="a"
                    href="/"
                    label={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={homeLogo}
                          alt="Logo"
                          style={{ marginRight: '4px' }}
                        />
                        Home
                      </div>
                    }
                  />
                  <StyledBreadcrumb
                    component="a"
                    href="#"
                    label={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                          src={plantLogo}
                          alt="Logo"
                          style={{ marginRight: '4px' }}
                        />
                        Plants
                      </div>
                    }
                  />
                  <StyledBreadcrumb
                    label={this.state.detailPlant.sname}
                    deleteIcon={<ExpandMoreIcon />}
                  />
                </Breadcrumbs>
              </div>
            </Paper>
            <Paper
              style={{
                width: '85%',
                margin: 'auto',
                marginTop: '30px',
                marginBottom: '30px',
                padding: '15px',
                backgroundColor: '#fff'
              }}
            >
              <Paper
                style={{
                  width: '90%',
                  margin: 'auto',
                  marginTop: '20px',
                  marginBottom: '62px',
                  padding: '30px',
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignContent: 'center'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center'
                  }}
                >
                  <div
                    style={{
                      marginRight: '20px',
                      color: '#000'
                    }}
                  >
                    <img
                      style={{
                        verticalAlign: 'middle',
                        borderStyle: 'none',
                        maxHeight: '267px',
                        width: '367px'
                      }}
                      alt=""
                      className="img-card"
                      src={this.state.detailPlant.refimg}
                    ></img>
                  </div>
                  <div>
                    <h6
                      style={{
                        margin: '0',
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                    >
                      Name :
                    </h6>
                    {this.state.detailPlant.name_en &&
                      this.state.detailPlant.name_en.map(dt => (
                        <Typography
                          style={{
                            color: 'black',
                            // marginLeft: "10px",
                            fontSize: '16px'
                          }}
                          variant="headline"
                          display="block"
                          gutterBottom
                        >
                          {dt + ' (en)'}
                        </Typography>
                      ))}
                    {this.state.detailPlant.name_loc1 &&
                      this.state.detailPlant.name_loc1.map(dt => (
                        <Typography
                          style={{
                            color: 'black',
                            // marginLeft: "10px",
                            fontSize: '16px'
                          }}
                          variant="headline"
                          display="block"
                          gutterBottom
                        >
                          {dt + ' (loc1)'}
                        </Typography>
                      ))}
                    {this.state.detailPlant.loc2 &&
                      this.state.detailPlant.loc2.map(dt => (
                        <Typography
                          style={{
                            color: 'black',
                            marginLeft: '10px',
                            fontSize: '16px'
                          }}
                          variant="headline"
                          display="block"
                          gutterBottom
                        >
                          {dt + ' (loc2)'}
                        </Typography>
                      ))}
                    <h6
                      style={{
                        margin: '0',
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                    >
                      Efficacy :
                    </h6>
                    {this.state.detailPlant.efficacy &&
                      this.state.detailPlant.efficacy.map(dt => (
                        <Typography
                          style={{
                            color: 'black',
                            // marginLeft: "10px",
                            fontSize: '16px'
                          }}
                          variant="headline"
                          display="block"
                          gutterBottom
                        >
                          {dt}
                        </Typography>
                      ))}

                    <h6
                      style={{
                        margin: '0',
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                    >
                      Potition :
                    </h6>
                    {this.state.detailPlant.refCrude &&
                      this.state.detailPlant.refCrude.map(dt => (
                        <Typography
                          style={{
                            color: 'black',
                            // marginLeft: "10px",
                            fontSize: '16px'
                          }}
                          variant="headline"
                          display="block"
                          gutterBottom
                        >
                          {dt.position + ` (${dt.sname})`}
                        </Typography>
                      ))}
                    <h6
                      style={{
                        margin: '0',
                        color: 'black',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                    >
                      Reference :
                    </h6>
                    {this.state.detailPlant.ref &&
                      this.state.detailPlant.ref.map(dt => (
                        <Typography
                          style={{
                            color: 'black',
                            // marginLeft: "10px",
                            fontSize: '16px'
                          }}
                          variant="headline"
                          display="block"
                          gutterBottom
                        >
                          {dt}
                        </Typography>
                      ))}
                  </div>
                </div>
              </Paper>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                centered
                classes={{ root: classes.tabs, indicator: classes.indicator }}
              >
                <Tab label="Herbal medicine use this plant" />
                <Tab label="Crude Drug" />
                <Tab label="Compound" />
                <Tab label="Crude Use by Ethnic" />
              </Tabs>
              <Paper
                style={{
                  width: '90%',
                  minHeight: '300px',
                  overflow: 'auto',
                  margin: 'auto',
                  marginTop: '20px',
                  marginBottom: '10px',
                  padding: '30px'
                }}
              >
                {this.state.value === 0 && (
                  <TabContainer>
                    {this.state.detailPlant.refHerbsMed && (
                      <div className="for-card">
                        {this.state.detailPlant.refHerbsMed.map(item => (
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
                  </TabContainer>
                )}
                {this.state.value === 1 && (
                  <TabContainer>
                    {this.state.detailPlant.refCrude !== undefined &&
                      this.state.detailPlant.refCrude.map(itm => {
                        return (
                          <ExpansionPanel>
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                            >
                              <Typography>
                                {' '}
                                <i>{itm.sname}</i>
                              </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                              style={{
                                display: 'flex',
                                flexDirection: 'column'
                              }}
                            >
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Saintifict Name : {itm.sname}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Name (in english) : {itm.name_en}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Local name I : {itm.name_loc1}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Local name II : <i>{itm.name_loc2}</i>
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Global Name : <i>{itm.gname}</i>
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Effect : {itm.effect}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Location Effect : {itm.effect_loc}
                              </Typography>
                              <Typography
                                variant="caption"
                                display="block"
                                gutterBottom
                              >
                                Refrence : {itm.ref}
                              </Typography>
                            </ExpansionPanelDetails>
                          </ExpansionPanel>
                        );
                      })}
                  </TabContainer>
                )}

                {/* {this.state.value === 2 && (
                  <TabContainer>
                    <div className={classes.cardContainer}>
                      {this.state.detailPlant.refCompound !== undefined && this.state.detailPlant.refCompound.length > 0 ? (
                        this.state.detailPlant.refCompound.map((itm) => (
                          <div key={itm._id} className={classes.cardItem}>
                            <CardCompound id={itm._id} part={itm.refPlant} name={itm.cname} image={`https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${itm.pubchem_ID}`} reff={itm.refPlant} />
                          </div>
                        ))
                      ) : (
                        <div style={{ textAlign: "center", padding: "0px" }}>
                          <img src={load} alt="nothing found" style={{ width: "100px", height: "100px" }} />
                          
                        </div>
                      )}
                    </div>
                  </TabContainer>
                )} */}
                {this.state.value === 2 && (
                  <TabContainer>
                    <div className={classes.cardContainer}>
                      {this.state.loading ? (
                        <div style={{ textAlign: 'center', padding: '0px' }}>
                          <Typography variant="subtitle1" gutterBottom>
                            LOADING...
                          </Typography>
                        </div>
                      ) : this.state.detailPlant.refCompound !== undefined &&
                        this.state.detailPlant.refCompound.length > 0 ? (
                        this.state.detailPlant.refCompound.map(itm => (
                          <div key={itm._id} className={classes.cardItem}>
                            <CardCompound
                              id={itm._id}
                              part={itm.refPlant}
                              name={itm.cname}
                              image={`https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=${itm.pubchem_ID}`}
                              reff={itm.refPlant}
                            />
                          </div>
                        ))
                      ) : (
                        <div style={{ textAlign: 'center', padding: '30px' }}>
                          <img
                            src={load}
                            alt="nothing found"
                            style={{ width: '100px', height: '100px' }}
                          />
                        </div>
                      )}
                    </div>
                  </TabContainer>
                )}

                {this.state.value === 3 && (
                  <TabContainer>
                    {this.state.detailPlant.refEthnic !== undefined &&
                    this.state.detailPlant.refEthnic.length > 0 ? (
                      this.state.detailPlant.refEthnic.map(itm => (
                        <ExpansionPanel key={itm.id}>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <Typography>
                              <i>
                                {itm.ethnic} / {itm.disease_ing}
                              </i>
                            </Typography>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails
                            style={{
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            <Typography variant="caption" gutterBottom>
                              Name plant (in bahasa) : {itm.name_ina}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                              Efficacy (in bahasa) : {itm.disease_ina}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                              Efficacy (in english) : {itm.disease_ing}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                              Family of plant : <i>{itm.family}</i>
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                              Part of plant used in therapeutic usage (in
                              bahasa) : {itm.section_ina}
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                              Part of plant used in therapeutic usage (in
                              english) : {itm.section_ing}
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      ))
                    ) : (
                      <div style={{ textAlign: 'center', padding: '60px' }}>
                        <img
                          src={load}
                          alt="nothing found"
                          style={{ width: '100px', height: '100px' }}
                        />
                      </div>
                    )}
                  </TabContainer>
                )}
              </Paper>
            </Paper>
          </div>
        )}
        {this.state.modal.open === true ? (
          <ModalCrude modal={this.state.modal} close={this.closeBtn} />
        ) : null}
        {this.state.snackbar.open === true ? (
          <SnackBar data={this.state.snackbar} close={this.closeBtn} />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DetailPlant);
