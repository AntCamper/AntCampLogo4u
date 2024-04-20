const inquirer = require('inquirer');
const fs = require('fs');  

const questions = [
    {
        type: 'input',
        name: 'test',
        message: 'What text would you like on your logo?',
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'What color should the text be?',
        default: 'black',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape for your logo:',
        choices: ['Circle','Square','Triangle'],
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'What color should the shape be?',
        default: 'blue',
    },
];

function generateSVGLogo(answers) {
    let svgString = `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">`;
}