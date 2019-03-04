import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import firebase from 'firebase';

function AppBar_(props) {
  const { style, onClickMenu, text, onClickPlus } = props;
  return (
  <AppBar position="static" style={style}>
    <Toolbar style={{ padding: 0 }}>
      <IconButton color="inherit" aria-label="Menu">
        <MenuIcon onClick={()=> onClickMenu && onClickMenu()} />
      </IconButton>
      <Typography
        style={{ width: '100%' }}
        variant="inherit" color="inherit"
      >
        {text}
      </Typography>
      <IconButton
        color="inherit"
      >
        <AddIcon onClick={()=> onClickPlus && onClickPlus()} />
      </IconButton>
    </Toolbar>
  </AppBar>
  );
}

class Drawer_ extends Component {
  render() {
    const { open, onClose } = this.props;
    return (
    <Drawer open={open} onClose={onClose}>
      <List onClick={onClose}>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
    );
  }
}





function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 30,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

const config = {
  apiKey: 'AIzaSyD1lTpU15dlK5VApMzrOueXpznSk1C3IT4',
  authDomain: 'certification-test-1234.firebaseapp.com',
  databaseURL: 'https://certification-test-1234.firebaseio.com/',
  projectId: 'certification-test-1234',
  storageBucket: 'gs://certification-test-1234.appspot.com',
  messagingSenderId: '633522599582'
}

class SimpleModal extends Component {
  constructor(props) {
    super(props);
    firebase.initializeApp(config);
    this.state = {
      user: undefined,
      email: '',
      password: '',
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  async handleSignUp(e) {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ user });
      });
      //this.props.history.push('/');
    } catch (error) {
      alert(error);
    }
  }

  async handleSignIn(e) {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ user });
      });
      //this.props.history.push('/');
    } catch (error) {
      alert(error);
    }
  }

  async handleSignOut(){
    try {
      await firebase.auth().signOut()
      .then(() => {
        this.setState({user: undefined});
      });
    }catch(error){
      alert(error);
    }
  }

  render() {
    const { classes } = this.props;
    const { open, onClose } = this.props;
    const { email, password } = this.state;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={onClose}
        >
          {/*<div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>*/}
          {(() => {
            return this.state.user ?
            (
              <div style={getModalStyle()} className={classes.paper}>
                <button onClick={()=> this.handleSignOut()}>sign out</button>
              </div>
            ) : (
              <div style={getModalStyle()} className={classes.paper}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input id="email" value={email} type="text" onChange={ (e) => this.setState({ email: e.target.value }) } />
                </div>
                <div>
                  <label htmlFor="password">password</label>
                  <input id="password" value={password} type="password" onChange={ (e) => this.setState({ password: e.target.value }) } />
                </div>
                <button onClick={this.handleSignUp}>Sign up</button>
                <button onClick={this.handleSignIn}>Sign in</button>
              </div>
            )
          })()}
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);





export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
    }
  }
  render() {
    const { className, style } = this.props;
    return (
    <div className={ className || 'App' }>
      <AppBar_ onClickMenu={()=> this.setState({ open: true })} style={style} onClickPlus={()=> this.setState({ modal: true })} />
      <Drawer_ open={this.state.open} onClose={()=> this.setState({ open: false })} />
      <SimpleModalWrapped open={this.state.modal} onClose={()=> this.setState({ modal: false })} />
    </div>
    );
  }
}
