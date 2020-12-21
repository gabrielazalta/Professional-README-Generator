const inquirer = require('inquirer');
const fs = require('fs');
const Choices = require('inquirer/lib/objects/choices');
const util = require('util');

const optionsArray =['APACHE 2.0','BSD 3','MIT','GPL 3.0', 'None']
const Write_file = util.promisify(fs.writeFile)

function User_P(){
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is title of your README file? (Required)',
            validate: titleInput => {
                 if (titleInput) {
                     return true;
                 } else {
                     console.log("Please provide a title!");
                     return false;
                 }
             }
         },
        {
            type: 'input',
            name: 'description',
            message: 'Please write a brief description of your project:'
        },
        {
            type: 'checkbox',
            name: 'license',
            message: 'Choose the kind of license for your project',
            choices: optionsArray,
        },
        {
            type: 'confirm',
            name: 'confirmInstallation',
            message: 'Would you like to include an Installation section?',
            default: true
        },
        {
            type: 'input',
            name: 'Installation',
            message: 'Please explain what are the steps required to install your project? Provide a step-by-step description of how to get the development environment running:',
            when: ({ confirmInstallation }) => confirmInstallation
        },
        {
            type: 'confirm',
            name: 'confirmUsage',
            message: 'Would you like to include a Usage section?',
            default: true
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Please provide instructions and examples for use:',
            when: ({ confirmUsage }) => confirmUsage
        },
        {
            type: 'confirm',
            name: 'confirmScreenshot',
            message: 'Would you like to include a screenshot to your Usage section??',
            default: true
        },
        {
            type: 'input',
            name: 'screenshot',
            message: '',
            when: ({confirmScreenshot}) => confirmScreenshot
        },
        {
            type: 'confirm',
            name: 'confirmCredits',
            message: 'Would you like to include a Credits section?',
            default: true
        },
        {
            type: 'input',
            name: 'collab',
            message: 'How to make a collaboration to the project'
        },
        {
            type: 'input',
            name: 'username',
            message: 'Please type your GitHub username?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email address?'
        },
    ])
}

function Create_md_file(survey){
    let License_type = '';
    if(survey.license == 'MIT'){
        License_type = '![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)'
    }else if (survey.license == 'APACHE 2.0'){
        License_type = '![License](https://img.shields.io/License_type/License-Apache%202.0-blue.svg)'
    }
    else if (survey.license == 'BSD 3'){
        License_type = '![License](https://img.shields.io/License_type/License-BSD%203--Clause-blue.svg)'
    }
    else if (survey.license == 'GPL 3.0'){
        License_type = '![License: GPL v3](https://img.shields.io/License_type/License-GPLv3-blue.svg)'
    } 
    else if (survey.license == 'None'){
        License_type = ''
    }       
return`# ${survey.title}  ${License_type}
## Description of the project:
${survey.description}
## Content:
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)


### Title

${survey.title}
### Installation:

Run the following to install the dependencies :
\`\`\`\`\`${survey.Installation}\`\`\`\`\`
### Usage:

Please follow the intructions given bellow in order to use this :
-----
${survey.usage}----
![picture](${survey.screenshot})
### License:

The project license is:
${survey.license}
### Collaboration:

${survey.collab}
### Contact:

If you have any questions/ doubts please contact me on [GitHub](https://github.com/${survey.username}) as contact 
${survey.author} or by email at ${survey.email}
![picture](https://github.com/${survey.username}.png?size=10) 
 `
}


User_P().then(function(survey){
    const markdown = Create_md_file(survey);
    return Write_file('./README.md', markdown);
}).then(function () {
        console.log('File ReadMe.md generated at main directory as README.md');
    }).catch(error => {
        if(error.isTtyError) {
            console.log(err)
        }
})