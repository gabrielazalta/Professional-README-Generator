// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const Choices = require('inquirer/lib/objects/choices');

const optionsArray =['APACHE 2.0','BSD 3','MIT','GPL 3.0', 'None']

// TODO: Create an array of questions for user input
function userPrompt(){
    return inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'What is your GitHub username(Required)',
            validate: userInput => {
                 if (userInput) {
                     return true;
                 } else {
                     console.log("Please provide a GitHub username");
                     return false;
                 }
             } 
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is your email?(Required)',
            validate: emailInput => {
                 if (emailInput) {
                     return true;
                 } else {
                     console.log("Please provide your email!");
                     return false;
                 }
             } 
        },
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
             when: ({ confirmScreenshot }) => confirmScreenshot
         },
         {
             type: 'confirm',
             name: 'confirmCredits',
             message: 'Would you like to include a Credits section?',
             default: true
         },
         {
             type: 'confirm',
             name: 'confirmLisence',
             message: 'Would you like to include a License section?',
             default: true
         },
         {
             type: 'checkbox',
             name: 'lisence',
             message: 'Please select the lisence you want:',
             choices: optionsArray,
             when: ({ confirmLisence }) => confirmLisence
         }
    ])
};

function promptCredits(parameter) {
    let creditsResponse = '';
    if (parameter.confirmCredits == true) {
        const creditsArray = [
            {
            type: 'input',
            name: 'collabName',
            message: 'What is the name of your collaborator? (Required)',
            validate: collabInput => {
                if (collabInput) {
                    return true;
                } else {
                    console.log("Please provide a name!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'collabLink',
            message: 'Provide the GitHub link for your collaborator (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please provide a GitHub link!");
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAssets',
            message: 'Would you like to include any third-party assets that require attribution?',
            default: true
            
        },
        {
            type: 'input',
            name: 'assets',
            message: 'Please include the name and link to the third-pary assets',
            when: ({ confirmAssets }) => confirmAssets
            
        },
        {
            type: 'confirm',
            name: 'confirmTutorials',
            message: 'Would you like to include links to any tutorials used?',
            default: false
        },
        {
            type: 'input',
            name: 'tutorials',
            message: 'Please include links to tutorials used',
            when: ({ confirmTutorials }) => confirmTutorials
            
        }
    ]
    }
}



// TODO: Create a function to write README file

function writeMDFile(userPrompt, promptCredits) {
    let licenseType = '';
    if(survey.license == 'MIT'){
        licenseType = '![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)'
    }else if (survey.license == 'APACHE 2.0'){
        licenseType = '![License](https://img.shields.io/licenseType/License-Apache%202.0-blue.svg)'
    }
    else if (survey.license == 'BSD 3'){
        licenseType = '![License](https://img.shields.io/licenseType/License-BSD%203--Clause-blue.svg)'
    }
    else if (survey.license == 'GPL 3.0'){
        licenseType = '![License: GPL v3](https://img.shields.io/licenseType/License-GPLv3-blue.svg)'
    } 
    else if (survey.license == 'None'){
        licenseType = ''
    } 
    return `
        #${userPrompt.title}
        ##Description
        ###${userPrompt.description}

        ##Table of Contents
        * [Installation Guide](#Installation)
        * [Usage Guide](#Usage)
        * [Credits Guide](#Credits)
        * [License Guide](#License)

        ### Installation Guide ${userPrompt.Installation}
        ### Usage Guide ${userPrompt.usage}
        ### Credits Guide
        ### License Guide
    `

}

userPrompt().then(function(userPrompt){
    const markdown = Create_md_file(userPrompt);
    return Write_file('./README.md', markdown);
}).then(function () {
        console.log('File ReadMe.md generated at main directory as README.md');
    }).catch(error => {
        if(error.isTtyError) {
            console.log(err)
        }
})
