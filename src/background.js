const TITLE_APPLY = "See time";
const TITLE_REMOVE = "Hide time";
const APPLICABLE_PROTOCOLS = ["http:", "https:"];
const ACTIVE_ICON = "icons/icon_active.svg";
const INACTIVE_ICON = "icons/icon_inactive.svg";

const SCRIPTS_PATH = "/scripts";

function toggleLifePrice(tab) {
  function gotTitle(title) {
    if (title === TITLE_APPLY) {
      browser.pageAction.setIcon({ tabId: tab.id, path: ACTIVE_ICON });
      browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_REMOVE });
      browser.tabs.executeScript({
        file: `${SCRIPTS_PATH}/remove-life.js`,
        allFrames: true
      });
    } else {
      browser.pageAction.setIcon({ tabId: tab.id, path: INACTIVE_ICON });
      browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_APPLY });
      browser.tabs.executeScript({
        file: `${SCRIPTS_PATH}/add-life.js`,
        allFrames: true
      });
    }
  }

  var gettingTitle = browser.pageAction.getTitle({ tabId: tab.id });

  gettingTitle.then(gotTitle);
}

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {
  var anchor = document.createElement("a");
  anchor.href = url;
  return APPLICABLE_PROTOCOLS.includes(anchor.protocol);
}

/*
Initialize the page action: set icon and title, then show.
Only operates on tabs whose URL's protocol is applicable.
*/
function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.pageAction.setIcon({ tabId: tab.id, path: ACTIVE_ICON });
    browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_REMOVE });
    browser.pageAction.show(tab.id);
    toggleLifePrice(tab)
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then(tabs => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

/*
Toggle CSS when the page action is clicked.
*/
browser.pageAction.onClicked.addListener(toggleLifePrice);
