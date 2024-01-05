import { writable } from 'svelte/store';
import { push, replace } from 'svelte-spa-router';

export const tabNames = [
  'Faqja e parë',
  'Rreth nesh',
  'Kurrikula',
  'Stafi',
  'Vlerësimet',
  'Aktivitete',
  'Të tjera',
  '',
];
export const tabPaths = [
  '/',
  '/about',
  '/curriculum',
  '/staff',
  '/', // TODO
  '/', // TODO
  '/other',
  '/'
];
const activeTabString = localStorage.getItem('activeTab');
let activeTabIndex: number;
if (activeTabString == null ||
    Number.isNaN(activeTabIndex = parseInt(activeTabString))) {
  activeTabIndex = 0;
} else if (activeTabString.startsWith('/')) {
  activeTabIndex = tabNames.length - 1;
  tabPaths[activeTabIndex] = activeTabString;
}

let firstTime = true;

export const activeTab = writable(activeTabIndex);
activeTab.subscribe(tabIndex => {
  if (firstTime) {
    firstTime = false;
    replace(tabPaths[tabIndex]);
    return;
  }
  if (tabIndex < tabPaths.length - 1) {
    localStorage.setItem('activeTab', tabIndex.toString());
  } else {
    localStorage.setItem('activeTab', tabPaths[tabIndex]);
  }
  push(tabPaths[tabIndex]).catch((e) => {
    console.error(
      'error at push(', tabIndex, ', ',
      tabPaths[tabIndex], ')',
      e
    );
  });
});

