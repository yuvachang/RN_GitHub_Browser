import axios from 'axios'

const initialState = {
  allStudents: [],
  selectedStudent: {},
  error: {}
}

//actions
const ALLSTUDENTS = 'ALLSTUDENTS'


//action creators
const allStudents = (students) => ({
  type: ALLSTUDENTS,
  students
})

//thunk creators
export const allStudentsThunker = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/students')
    dispatch(allStudents(data))
  }
}

const repos = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default repos
