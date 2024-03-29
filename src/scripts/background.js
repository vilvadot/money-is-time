import getConfig from './util/getConfig'
import extension from './util/extension'

const INITIAL_STATE = {
  rate: 6,
  isEnabled: true
}

const setInitialState = () => {
  extension.storage.local.set(INITIAL_STATE);
}

// Sync UI with storage
getConfig().then(state => {
  const isFirstExecution = !Object.keys(state).length
  if(isFirstExecution){
    setInitialState()
  }
})