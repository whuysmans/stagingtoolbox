import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      infofiches: [],
      kernthemas: [],
      homeInfo: null,
      biblio: null,
      activeFilter: '',
      activeNav: '',
      classSlug: {},
      activeState: '',
      token: '',
      isAuthenticated: false
    },

    mutations: {
      LOAD_INFO_FICHES (state, fiches) {
        fiches.map((fiche) => {
          state.infofiches.push(fiche)
        })
      },
      LOAD_KERN_THEMAS (state, themas) {
        // dirty hack to load them in the right order
        state.kernthemas.push(themas.filter((thema) => {
          return thema._id === 4
        })[0])
        state.kernthemas.push(themas.filter((thema) => {
          return thema._id === 2
        })[0])
        state.kernthemas.push(themas.filter((thema) => {
          return thema._id === 3
        })[0])
        themas.map((thema) => {
          state.classSlug[thema.Titel] = thema.Slug
        })
      },
      LOAD_HOME_INFO (state, info) {
        state.homeInfo = info
      },
      LOAD_BIBLIO (state, biblio) {
        state.biblio = biblio
      },
      SET_ACTIVE_FILTER (state, filter) {
        state.activeFilter = filter
      },
      SET_ACTIVE_NAV (state, nav) {
        state.activeNav = nav
      },
      SET_ACTIVE_STATE (state, active) {
        state.activeState = active
      },
      SET_AUTHENTICATED_STATE (state, auth) {
        state.isAuthenticated = auth
      },
      SET_TOKEN (state, token) {
        state.token = token
      }
    },

    actions: {
      async nuxtServerInit ({commit}, state) {
        let results = await Promise.all([
          axios.get('https://staging2.cipt.be/toolbox/wp-json/toolbox/v1/infofiches'),
          axios.get('https://staging2.cipt.be/toolbox/wp-json/toolbox/v1/kernthemas'),
          axios.get('https://staging2.cipt.be/toolbox/wp-json/toolbox/v1/homeinfo'),
          axios.get('https://staging2.cipt.be/toolbox/wp-json/toolbox/v1/bibliografie')
        ])
        commit('LOAD_INFO_FICHES', results[0].data.entries)
        commit('LOAD_KERN_THEMAS', results[1].data.entries)
        commit('LOAD_HOME_INFO', results[2].data.entries)
        commit('LOAD_BIBLIO', results[3].data.entries)
      },
      setActiveFilter ({commit}, filter) {
        commit('SET_ACTIVE_FILTER', filter)
      },
      setActiveNav ({commit}, nav) {
        commit('SET_ACTIVE_NAV', nav)
      },
      setActiveState ({commit}, active) {
        commit('SET_ACTIVE_STATE', active)
      },
      setAuthenticatedState ({commit}, auth) {
        commit('SET_AUTHENTICATED_STATE', auth)
      },
      setToken ({commit}, token) {
        commit('SET_TOKEN', token)
      }
    },

    getters: {
      isAuthenticated (state) {
        return state.isAuthenticated
      },
      getBiblio (state) {
        return state.biblio
      },
      getInfoFiches (state) {
        return state.infofiches
      },
      getClassSlug (state) {
        return (title) => {
          return state.classSlug[title]
        }
      },
      getKernThemas (state) {
        return state.kernthemas
      },
      getHomeInfo (state) {
        return state.homeInfo
      },
      getInfoFiche (state) {
        return (name) => {
          return state.infofiches.filter((fiche) => {
            return fiche.Slug.toLowerCase() === name
          })
        }
      },
      getInfoFicheIndex (state) {
        return (name) => {
          return state.infofiches.indexOf(state.infofiches.filter((fiche) => {
            return fiche.Slug.toLowerCase() === name
          })[0])
        }
      },
      getSlugByNumber (state) {
        return (nr) => {
          return state.infofiches[nr].Slug
        }
      },
      getNumberOfFiches (state) {
        return state.infofiches.length
      },
      getActiveFilter (state) {
        return state.activeFilter
      },
      getActiveNav (state) {
        return state.activeNav
      },
      filterFiche (state) {
        return (name) => {
          return state.infofiches.filter((fiche) => {
            return fiche.Subcategorie.find((subcat) => {
              return subcat.display === name
            })
          })
        }
      },
      getActiveState (state) {
        return state.activeState
      }
    }
  })
}

export default createStore
