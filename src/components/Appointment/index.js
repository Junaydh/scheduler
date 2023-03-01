import React, {Fragment} from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id ,interview)
      .then(() => transition(SHOW));
  }
  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
    </article>
  )
};