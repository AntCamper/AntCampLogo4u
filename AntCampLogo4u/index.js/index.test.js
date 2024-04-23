const fs = require('fs');
const { promptUserAndGenerateLogo } = require('./index.js'); 

jest.mock('inquirer', () => ({
 prompt: jest.fn().mockResolvedValue({
    text: 'Test Text',
    textColor: 'red',
    shape: 'Circle',
    shapeColor: 'blue',
 }),
}));

const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

describe('generateSVGLogo', () => {
 beforeEach(() => {
    jest.clearAllMocks();
 });

 it('generates an SVG logo with the provided text and colors', async () => {
    await promptUserAndGenerateLogo(); 

    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      'logo.svg',
      expect.stringContaining('<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">')
    );
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      'logo.svg',
      expect.stringContaining('<circle cx="150" cy="100" r="50" fill="blue" />')
    );
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      'logo.svg',
      expect.stringContaining('<text x="150" y="100" font-size="20" text-anchor="middle" fill="red">Test Text</text>')
    );
 });
});
