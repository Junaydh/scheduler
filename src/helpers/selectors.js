export function getAppointmentsForDay(state, day) {
  const result = [];
  const dayObj = state.days.find((dayObj) => dayObj.name === day);
  if (!dayObj) {
    return result;
  }
  for (const id of dayObj.appointments) {
    result.push(state.appointments[id]);
  }
  return result;
}

export function getInterview(state, interview) {
  if (interview != null) {
    const result = {
      student: interview.student,
      interviewer: {
        id: interview.interviewer,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
    };
    return result;
  } else {
    return null;
  };
}

export function getInterviewersForDay(state, day) {
  const result = [];
  const dayObj = state.days.find((dayObj) => dayObj.name === day);
  if (!dayObj) {
    return result;
  }
  for (const id of dayObj.interviewers) {
    result.push(state.interviewers[id]);
  }
  return result;
}