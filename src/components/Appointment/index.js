import React, {Fragment} from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === EMPTY && <Empty onAdd={() => console.log('clicked onAdd')}/>}
    </article>
  )
};