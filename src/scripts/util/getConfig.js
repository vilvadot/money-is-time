const getConfig = () => {
  return new Promise(resolve => {
    browser.storage.local.get().then(state => {
      resolve(state);
    });
  });
};

export default getConfig