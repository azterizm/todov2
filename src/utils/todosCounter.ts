const height: number = window.innerHeight;

export let count: number;
if (height <= 500) count = 4;
else if (height <= 600) count = 5;
else if (height <= 800) count = 7;
else if (height <= 1200) count = 8;

export const emailReg: RegExp = /^(([^<>()[\]\\.:\s@"]+(\.[^<>()[\]\\.:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
