const height: number = window.innerHeight;

export let loaderCount: number;
if (height <= 500) loaderCount = 4;
else if (height <= 600) loaderCount = 5;
else if (height <= 800) loaderCount = 7;
else if (height <= 1200) loaderCount = 8;

export const emailReg: RegExp = /^(([^<>()[\]\\.:\s@"]+(\.[^<>()[\]\\.:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
