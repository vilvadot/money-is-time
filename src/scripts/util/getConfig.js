import extension from './extension'

const getConfig = () => {
  return new Promise(resolve => {
    extension.storage.local.get((state) => {
      resolve(state)
    })
  });
};

export default getConfig