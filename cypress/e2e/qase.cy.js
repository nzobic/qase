const loginPage = require('../support/pages/loginPage').loginPage;
const projectPage = require('../support/pages/projectPage').projectPage;
const suitePage = require('../support/pages/suitePage').suitePage;
const testPage = require('../support/pages/testPage').testPage;
const testPlanPage = require('../support/pages/testPlanPage').testPlanPage;


// const { fake } = require('faker');
// const faker = require('faker');

describe('QASE Test', () => {

  cy.on('uncaught:exception', (err, runnable) => {
    return false
   })

  let randomNumber1 = Math.floor(Math.random() * 10000) + 1
  let randomNumber2 = Math.floor(Math.random() * 100) + 1
  let projectName = 'Test Project ' + randomNumber1
  let projectCode = 'TP0' + randomNumber2
  let suiteName = 'Test Suite 0' + randomNumber2

  
  it('Create Project', () => {
  
  //Login

    cy.login('testmail28@email-temp.com', 'TestPass123');

  //Create Project

    cy.createProject (
      projectName,
      projectCode,
      'Project Description',
      'private',
      'none'
    );  

  })

  it('Create Test Suite', () => {

  //Login
    
    cy.login('testmail28@email-temp.com', 'TestPass123');
    
  //Create Test Suite

    cy.get(projectPage.projectLink.replace('$', projectCode)).click()
  
    cy.createTestSuite (
      suiteName,
      'Project root',
      'Test Suite Description',
      'Test Suite Preconditions',
    ); 

  })

  it('Create Test Case', () => {

  //Login
      
    cy.login('testmail28@email-temp.com', 'TestPass123');
      
  //Create Test Cases

    cy.get(projectPage.projectLink.replace('$', projectCode)).click()

    for (let i = 1; i<=2; i++) {
      cy.get(suitePage.createCaseBtn).click()
      cy.createTestCase(
        'Test Case: ' + i,
        'Draft',
        suiteName,
        'Minor',
        'Low'
      );
    }

    cy.wait(5000)
  
  })

  it('Create Test Plan', () => {

  //Login
        
    cy.login('testmail28@email-temp.com', 'TestPass123');
        
  //Create Test Plan
  
    cy.get(projectPage.projectLink.replace('$', projectCode)).click()

    cy.get(suitePage.testPlanLabel).click()

    cy.createTestPlan(
      'Test Plan 1',
      'SMOKE Test Plan'
    );

  })


})