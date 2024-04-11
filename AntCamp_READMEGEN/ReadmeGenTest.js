const inquirer = require('inquirer');
const fs = require('fs');
const mockFs = require('mock-fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const generateReadme = require('./index.js');

jest.mock('inquirer');
jest.mock('fs');

describe('README Generator', () => {
 beforeEach(() => {
    mockFs({});
 });

 afterEach(() => {
    mockFs.restore();
 });

 it('generates a README.md file with the provided input', async () => {
    inquirer.prompt.mockResolvedValue({
      title: 'My Project',
      description: 'This is my project.',
      installation: 'Run `npm install`.',
      usage: 'Use it like this.',
      license: 'MIT',
      contributing: 'Contribute by doing this.',
      tests: 'Run tests with `npm test`.',
      githubUsername: 'myusername',
      email: 'myemail@example.com',
    });
    await generateReadme();
    const readmeContent = fs.readFileSync('README.md', 'utf8');
    expect(readmeContent).toMatchSnapshot();
 });
});
