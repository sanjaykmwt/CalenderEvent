import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './main.scss';
import {getEvents} from "./actions/event";
import moment from 'moment';
import EventModel from './Model/evtmod'
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      'isLoading':false,
      'evt_popup':false,
      'event_date':null
    }
    this.handleDateClick        =   this.handleDateClick.bind(this);
    this.handleEventClick       =   this.handleEventClick.bind(this);
    this.handleEventLimitClick  =   this.handleEventLimitClick.bind(this);
    this.nextClick       =   this.nextClick.bind(this);
  }

  handleDateClick(date){
      var eventDate   =   moment(date.date).format("DD MMMM YYYY")
      this.setState({'evt_popup':true,'event_date':eventDate})
  }

  handleEventClick(event){
      var eventDate   =   moment(event.event.start).format("DD MMMM YYYY")
      this.setState({'evt_popup':true,'event_date':eventDate})
  }
  handleEventLimitClick(event){
      var eventDate   =   moment(event.date).format("DD MMMM YYYY")
      this.setState({'evt_popup':true,'event_date':eventDate})
  }
  nextClick(e,successCallback, failureCallback){
      getEvents().then(result =>{
          this.setState({isLoading: false})
          var rr_result = JSON.parse(result)
          successCallback(
            rr_result.map((x)=> {
                  var events = {
                      title : x.title,
                      date : moment(x.date).format("YYYY-MM-DD"),
                  }
                      events.backgroundColor = "#5271f6"
                  return events
              })
          )
      }).catch(err =>{
          failureCallback(err);
      })
  }

  add(e){
    var event = window.localStorage.getItem('addevt',null)
    this.setState({evt_popup:false})
    if(event==null){
      var loc_arr=[];
      loc_arr.push({title:e,date:this.state.event_date})
      window.localStorage.setItem('addevt',JSON.stringify(loc_arr))
      window.location.reload(true);
    }else{
      var apevt = JSON.parse(event)
      apevt.push({title:e,date:this.state.event_date})
      window.localStorage.setItem('addevt',JSON.stringify(apevt))
      window.location.reload(true);
    }
  }
  render(){
    return <div style={{margin:"20px"}}>
        <FullCalendar 
                    defaultView="dayGridMonth" 
                    plugins={[ dayGridPlugin, interactionPlugin]}
                    header={
                        {left:   'prev',
                        center: 'title',
                        right:  'next'}
                    }
                    contentHeight= "auto"
                    selectable={true}
                    displayEventTime={true}
                    timeZone="UTC"
                    themeSystem='bootstrap4'
                    events={this.nextClick}
                    eventLimit= {2}
                    eventLimitText= ""
                    eventColor= "#FFFF"
                    dateClick={this.handleDateClick}
                    eventClick={this.handleEventClick}
                    eventLimitClick={this.handleEventLimitClick}
                    showNonCurrentDates={false}
                />
                <EventModel show={this.state.evt_popup} onSave={(result)=>{
                  this.add(result)
                }} onClose={()=>{
                  this.setState({evt_popup:false})
                }}/>
    </div>
  }
}



export default App;

