// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [
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
    }
    {
        type: 'input',
        name: 'lisence',
        message: '',
        when: ({ confirmLisence }) => confirmLisence
    }
];

//if user wamts to include credits, ask the following:
        // {
        //     type: 'input',
        //     name: 'collabName',
        //     message: 'What is the name of your collaborator? (Required)',
        //     validate: collabInput => {
        //         if (collabInput) {
        //             return true;
        //         } else {
        //             console.log("Please provide a name!");
        //             return false;
        //         }
        //     }
        // },
        // {
        //     type: 'input',
        //     name: 'collabLink',
        //     message: 'Provide the GitHub link for your collaborator (Required)',
        //     validate: linkInput => {
        //         if (linkInput) {
        //             return true;
        //         } else {
        //             console.log("Please provide a GitHub link!");
        //             return false;
        //         }
        //     }
        // },
        // {
        //     type: 'confirm',
        //     name: 'assets',
        //     message: 'Would you like to include any third-party assets that require attribution?',
        //     default: false
        // },
        // {
        //     type: 'confirm',
        //     name: 'tutorials',
        //     message: 'Would you like to include links to any tutorials used?',
        //     default: false
        // }


// TODO: Create a function to write README file
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./Develop/dist/README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'README Created!'
            });
        });
    });
}

// TODO: Create a function to initialize app
function init() {}

// Function call to initialize app
init();
