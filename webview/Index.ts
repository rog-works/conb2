import { ipcRenderer } from 'electron';

console.log('On Preload before');

ipcRenderer.sendToHost('preload', 'some return values');

console.log('On Preload after');
