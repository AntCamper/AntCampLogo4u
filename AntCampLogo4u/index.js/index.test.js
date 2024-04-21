const inquirer = require('inquirer');
const fs = require('fs');
const { generateSVGLogo } = require('./index'); 

jest.mock('inquirer');

describe('generateSVGLogo', () => {
 beforeEach(() => {
    inquirer.prompt.mockClear();
    fs.writeFileSync.mockClear();
 });

 it('generates an SVG logo with the provided text and colors', async () => {
    inquirer.prompt.mockResolvedValue({
      text: 'Test Text',
      textColor: 'red',
      shape: 'Circle',
      shapeColor: 'blue',
    });

    fs.writeFileSync.mockImplementation(() => {});

    await generateSVGLogo();

    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'logo.svg',
      expect.stringContaining('<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">')
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'logo.svg',
      expect.stringContaining('<circle cx="150" cy="100" r="50" fill="blue" />')
    );
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      'logo.svg',
      expect.stringContaining('<text x="150" y="100" font-size="20" text-anchor="middle" fill="red">Test Text</text>')
    );
 });
});