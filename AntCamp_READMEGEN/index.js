const fs = require('fs');

import('inquirer').then(({ prompt }) => {
 const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Provide installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide usage information:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your project:',
      choices: ['MIT', 'Apache 2.0', 'GPL 3.0', 'BSD 3', 'None'],
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Provide contribution guidelines:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Provide test instructions:',
    },
    {
      type: 'input',
      name: 'githubUsername',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
 ];

 prompt(questions).then((answers) => {
    const licenseBadge = answers.license !== 'None' ? `![License: ${answers.license}](https://img.shields.io/badge/License-${answers.license}-blue.svg)` : '';
    const readmeContent = `# ${answers.title}\n\n${licenseBadge}\n\n## Description\n\n${answers.description}\n\n## Installation\n\n${answers.installation}\n\n## Usage\n\n${answers.usage}\n\n## License\n\nThis project is licensed under the ${answers.license} License.\n\n## Contributing\n\n${answers.contributing}\n\n## Tests\n\n${answers.tests}\n\n## Questions\n\nIf you have any questions about the repo, open an issue or contact me directly at ${answers.email}. You can find more of my work at [${answers.githubUsername}](https://github.com/${answers.githubUsername}).`;

    fs.writeFile('README.md', readmeContent, (err) => {
      if (err) throw err;
      console.log('README.md has been created!');
    });
 });
});