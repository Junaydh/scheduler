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