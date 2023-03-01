import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return Axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
      setState({...state, appointments})
    })
  }
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDay = day => setState({ ...state, day });
  const interviewers = getInterviewersForDay(state, state.day);
  const appointmentsArr = Object.values(dailyAppointments).map(appointment => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment {...appointment} key={appointment.id} interview={interview}  interviewers={interviewers} bookInterview={bookInterview}/>
    )
  }) 
  useEffect(() => {
    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments'),
      Axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);
  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler"/>
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} 
          value={state.day} 
          onChange={setDay} 
        />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {appointmentsArr}
      </section>
    </main>
  );
}
