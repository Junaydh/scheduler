import React, { useState, useEffect } from "react";
import Axios from 'axios';

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}});
  const dailyAppointments = [];
  const setDay = day => setState({ ...state, day });
  const appointmentsArr = Object.values(dailyAppointments).map(appointment => {
    return (
      <Appointment key={appointment.id} {...appointment} />
    )
  }) 
  useEffect(() => {
    Promise.all([
      Axios.get('/api/days'),
      Axios.get('/api/appointments')
    ]).then(all => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
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
