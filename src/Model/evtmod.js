import React from 'react';
import {compose} from "recompose";
import {withRouter} from "react-router-dom";

import {withStyles} from "@material-ui/core/styles";
import { createStyles} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import Slide from '@material-ui/core/Slide';
import {DialogContent, Button, DialogActions, DialogContentText,TextField,DialogTitle } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

class EventModel extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            'isLoading': false,
            'description':''
        }
        this.handleClose      =   this.handleClose.bind(this);
        this.handleSave      =   this.handleSave.bind(this);
    }

    handleClose(){
        this.props.onClose()
    }

    handleSave(){
        this.props.onSave(this.state.description)
    }

    render(){
        var {show}   =   this.props;
        var {classes}     =   this.props;
        return(
            <Dialog  aria-labelledby="simple-dialog-title" open={show} TransitionComponent={Transition}  onClose={()=>{
                this.props.onClose()
            }}>
                <DialogTitle id="simple-dialog-title">Event</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={classes.typography}>
                        <TextField id="outlined-basic" label="Description" variant="outlined" onChange={(e)=>{
                            this.setState({'description':e.target.value})
                        }}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSave} color="primary" size="small"  autoFocus className={classes.typography}>
                        Submit
                    </Button>
                    <Button onClick={()=>{
                        this.handleClose()
                    }} size="small"  autoFocus className={classes.typography}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}


const style =  function(theme){

    return createStyles({
        'typography':{
            fontFamily:theme.typography.fontFamily.regular
        },
        'loader': {
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center"
        },
        
    });
};

export default compose(withRouter,withStyles(style))(EventModel);

