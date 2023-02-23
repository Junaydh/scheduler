import React, {Fragment} from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import "components/Appointment/styles.scss";


export default function Appointment(props) {

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {!props.interview && <Empty />}
    </article>
  )
};