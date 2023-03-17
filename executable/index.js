const {
    spawn
} = require('child_process');
const unzipper = require('unzipper');
const fs = require('fs');

const appName = 'GeometryDash.exe'; // Replace with the name of the application you want to open

const app = spawn(appName);

fs.createReadStream('geoxine.dat')
    .pipe(unzipper.Extract({
        path: 'geoxine'
    }))
    .on('finish', () => {
        let proc = spawn('geoxine/exec.exe', ['geoxine'], {
            stdio: 'inherit'
        });
        proc.on('close', () => fs.rmSync('geoxine', {
            recursive: true
        }));
    });
