import createPersistedState from 'vuex-persistedstate';

export default ({store}) => {
  createPersistedState({
    key: 'edusanjal-f',
    paths: ['collection',]
  })(store)
}