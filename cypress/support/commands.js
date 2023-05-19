const loginPage = require('../support/pages/loginPage').loginPage;
const projectPage = require('../support/pages/projectPage').projectPage;
const suitePage = require('../support/pages/suitePage').suitePage;
const testPage = require('../support/pages/testPage').testPage;
const testPlanPage = require('../support/pages/testPlanPage').testPlanPage;


/**
 * @memberof cy
 * @method login
 * @param email Email
 * @param password Password
 */

Cypress.Commands.add('login', (email, password) => { 

    cy.visit('https://app.qase.io/login')
    cy.get(loginPage.email).type(email)
    cy.get(loginPage.password).type(password)
    cy.get(loginPage.loginBtn).click()

})


/**
 * @memberof cy
 * @method createProject
 * @param name Project Name
 * @param code Project Code
 * @param description Project Description
 * @param projectType Access Type
 * @param memberAccess Member Access
 */

Cypress.Commands.add('createProject', (name, code, description, projectType, memberAccess) => { 

    cy.get(projectPage.createProjectBtn).click()
    cy.get(projectPage.projectName).type(name)
    cy.get(projectPage.projectCode).clear().type(code)
    cy.get(projectPage.projectDesc).type(description)
    if (projectType !== 'private') {
        cy.get(projectPage.accessType.public).check()
    } else {
            if (memberAccess === 'all') {
                cy.get(projectPage.memberAccess.all).check()
            } else if (memberAccess === 'group') {
                cy.get(projectPage.memberAccess.group).check()
                cy.get(projectPage.groupAccess).type('Owner group{enter}')
            } else {
                cy.get(projectPage.memberAccess.none).check()
            }
    }
    cy.get(projectPage.createBtn).click()

})


/**
 * @memberof cy
 * @method createTestSuite
 * @param name Test Suite Name
 * @param parentSuite Test Suite Project Root
 * @param description Test Suite Description
 * @param preconditions Test Suite Precondition
 */

Cypress.Commands.add('createTestSuite', (name, parentSuite, description, preconditions) => { 

    cy.get(suitePage.createSuiteBtn).click()
    cy.get(suitePage.suiteName).type(name)
    if (parentSuite !== 'Project root') {
        // TODO select an existing suite as parent suite
    }
    cy.get(suitePage.suiteDesc).eq(0).type(description)
    cy.get(suitePage.precondition).eq(1).type(preconditions)
    cy.get(projectPage.createBtn).click()

})


/**
 * @memberof cy
 * @method createTestCase
 * @param testName Test Case Name
 * @param testStatus Test Case Status
 * @param testSuite Test Case Suite
 * @param severity Test Case Severity
 * @param priority Test Case Priority
 */

Cypress.Commands.add('createTestCase', (testName, testStatus, testSuite, severity, priority) => { 

    cy.get(testPage.testTitle).type(testName)

    cy.xpath(testPage.dropdownElements.replace('$', 'Status')).click()
    cy.contains(testStatus).click({force:true})

    cy.xpath(testPage.dropdownElements.replace('$', 'Suite')).click()
    cy.contains(testSuite).click({force:true})

    cy.xpath(testPage.dropdownElements.replace('$', 'Severity')).click()
    cy.contains(severity).click({force:true})

    cy.xpath(testPage.dropdownElements.replace('$', 'Priority')).click()
    cy.contains(priority).click({force:true})

    for (let i = 1; i<=3; i++) {
        cy.get(testPage.addStepsBtn).click()
        cy.get(testPage.stepAction).type('Step action ' + i)
        cy.get(testPage.data).type('This is data ' + i)
        cy.get(testPage.expectedResult).type('Expected result ' + i)
    }

    cy.get(testPage.SaveBtn).click()

})


/**
 * @memberof cy
 * @method createTestPlan
 * @param planTitle Test Plan Name
 * @param planDescription Test Plan Description
 */

Cypress.Commands.add('createTestPlan', (planTitle, planDescription) => { 
    
    cy.get(testPlanPage.createPlanBtn).click()
    cy.get(testPlanPage.testPlanTitle).type(planTitle)
    cy.get(testPlanPage.planDescription).type(planDescription)
    cy.get(testPlanPage.addTestBtn).click()
    cy.get(testPlanPage.suiteLabel).click()
    cy.get(testPlanPage.testCaseCheckbox.replace('$', 2)).click()
    cy.get(testPlanPage.DoneBtn).click()
    cy.get(testPlanPage.SaveBtn).click()
    
})
 