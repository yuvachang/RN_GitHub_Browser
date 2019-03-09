import axios from 'axios'

const initialState = {
  allRepos: [],
}

//actions
const REPOS = 'REPOS'


//action creators
const getRepos = (repos) => ({
  type: REPOS,
  repos
})

//thunk creators
export const getReposThunk = (login) => {
  return async dispatch => {
    try {
      
      let encoded = base64.encode(`${login.email}:${login.password}`)
      let config = {
        headers: {'Authorization': 'Basic ' + encoded}
      }
      const res = await axios.get(
        'https://api.github.com/user/repos?visibility=private&affiliation=owner&sort=created&per_page=300', config
      )
      const list = res.data.map(repo=>repo.name)
      console.log('dataaaaaaaaaaaaaaa', list)
    } catch (error) {
      console.log('hello error', error)
    }
  }
}

const repos = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default repos
