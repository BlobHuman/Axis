const Fs = require('fs');
const Yml = require('yaml');
const MakeConfig = require('./makeConfig');
const Version = require('./version');

module.exports = class {
    /**
     * @param {string} language location of the language file
     */
    constructor(location) {
        this.location = location;
    }

    parse() {
        if(!this.location || this.location == null) throw new Error("No language location specified");
        if(!Fs.existsSync(this.location)) MakeConfig(this.location, generateLang());

        let language = Fs.readFileSync(this.location, 'utf8');
            language = Yml.parse(language);
        
        if(language.version != Version) throw new Error("Unsupported language version. Version:" + language.version + "; Supported: " + Version);

        return language;
    }
}

function generateLang() {
    return `error:
  - 'Error!'
  - 'An error!'
  - 'Error occurred'
  - 'POG error occured!'
empty:
  - 'Fill all required fields'
  - 'Don''t leave it'
  - 'Why empty fields'
needPing:
  - 'Ping someone!'
  - 'Ping someone!'
  - 'Ping someone! bruh'
thinking:
  - 'Thonking'
  - 'Thinking...'
  - 'Thonk... Thonk...'
  - 'Thonking...'
  - 'My brain is thinking...'
noPerms:
  - 'No perms!'
  - 'You don''t have permissions to do that!'
  - 'You don''t have perms'
  - 'LUL no perms!'
notAvailable:
  - 'This action is not available'
  - 'This is not available'
  - 'You can''t use this for now'
noResponse:
  - 'I got nothing for you'
  - 'Sorry, I don''t see anything for you'
  - 'I can''t get response for this'
success:
  - 'Successful!'
  - 'Successful'
  - 'Noice! It''s done'
tooLarge:
  - 'This is too large'
  - 'Too large for me'
  - ':eyes: can you make it smaller?'
tooSmall:
  - 'Too small!'
  - 'Too small'
  - 'So tiny for me'

# For commands
stop: 
  - 'Ok'
  - 'Shut up! I''ll stop now'
  - 'Ok bitch'
  - 'Stopping...'
help:
  title: 'Command Help'
  description: 'Here''s a list of the current commands:'

version: ${Version} # Version (don't modify this value)`;
}