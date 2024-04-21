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
   
    if (answers.shape === 'Circle') {
       svgString += `<circle cx="150" cy="100" r="50" fill="${answers.shapeColor}" />`;
    } else if (answers.shape === 'Square') {
       svgString += `<rect x="75" y="50" width="150" height="100" fill="${answers.shapeColor}" />`;
    } else if (answers.shape === 'Triangle') {
       svgString += `<polygon points="150,50 250,150 50,150" fill="${answers.shapeColor}" />`;
    }
   
    svgString += `<text x="150" y="100" font-size="20" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>`;
    svgString += `</svg>`;
   
    fs.writeFileSync('logo.svg', svgString);
    console.log('Logo generated successfully!');
   }
   
   inquirer.prompt(questions).then(generateSVGLogo);