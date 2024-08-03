#!/usr/bin/env node
import inquirer from 'inquirer';
import { differenceInSeconds } from 'date-fns';
let ans = await inquirer.prompt({
    type: 'input',
    name: 'userinput',
    message: 'Please enter the number of seconds:',
    validate: (input) => {
        if (isNaN(input) || input.trim() === '') {
            return 'Please enter a valid number';
        }
        else if (Number(input) <= 0) {
            return 'The number of seconds must be greater than 0';
        }
        else if (Number(input) > 3600) { // Allow up to 1 hour (3600 seconds)
            return 'The number of seconds must be 3600 or less';
        }
        else {
            return true;
        }
    }
});
function startTime(val1) {
    const startTime = new Date();
    const endTime = new Date(startTime.getTime() + val1 * 1000);
    const intervalId = setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(endTime, currentTime);
        if (timeDiff <= 0) {
            console.log('Time has expired');
            process.exit(); // Stop the interval
        }
        else {
            const min = Math.floor(timeDiff / 60);
            const sec = Math.floor(timeDiff % 60);
            console.log(`${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`); // Makes the time appear in 2 digits
        }
    }, 1000);
}
startTime(ans.userinput);
