import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  const reset = function() {
    setStudent("");
    setError('');
    setInterviewer(null);
  }

  const cancel = function() {
    reset();
    props.onCancel();
  }
  
  const validate = function() {
    if (student === '') {
      setError('Student name cannot be blank');
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError('');
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            />
            <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}