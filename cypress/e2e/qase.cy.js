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

  var randNumber01 = Math.floor(Math.random() * 10000) + 1
  var randNumber02 = Math.floor(Math.random() * 100) + 1
  var projectName = 'Test Project ' + randNumber01
  var projectCode = 'TP0' + randNumber02
  var suiteName = 'Test Suite 0' + randNumber02

  
  it('Create Project', () => {
  
  //Login
  
  cy.login(
    'testmail28@email-temp.com',
    'TestPass123'
  );

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
    
  cy.login(
    'testmail28@email-temp.com',
    'TestPass123'
  );
    
  //Create Test Suite

  cy.get(projectPage.project.replace('$', projectCode)).click()
  
  cy.createTestSuite (
    suiteName,
    'Project root',
    'Test Suite Description',
    'Test Suite Preconditions',
  ); 

  })

  it('Create Test Case', () => {

  //Login
      
  cy.login(
    'testmail28@email-temp.com',
    'TestPass123'
  );
      
  //Create Test Cases

  cy.get(projectPage.project.replace('$', projectCode)).click()

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
        
  cy.login(
    'testmail28@email-temp.com',
    'TestPass123'
  );
        
  //Create Test Plan
  
  cy.get(projectPage.project.replace('$', projectCode)).click()
  cy.get(suitePage.testPlanLabel).click()

  cy.createTestPlan(
    'Test Plan 1',
    'SMOKE Test Plan'
  );

  })





  xit('Iteration through Projects', () => {

  //Login
        
  cy.login(
    'testmail28@email-temp.com',
    'TestPass123'
  );
        
  //each Project contains word 'Project' in itself
  cy.get('.project-row > td:nth-child(3) a').each(($el, index, $list) => {

  }).should('contain', 'Project')


  //for each Project, print the index and text from the 'Unresolved defects' column
  cy.get('.project-row > td:nth-child(4)').each(($el, index, $list) => {
      cy.log("Index " + index + ": " + $el.text())
  })

    
  //click on each Project
  cy.get('.project-row > td:nth-child(3) a').each(($el, index, $list) => {

    cy.wrap($el).click()
    // cy.get('.LALnEw').invoke('text').should('eq', $el.text())
    // cy.go('back')
      
    // cy.get('.LALnEw').invoke('text').as('elementText')
    // cy.get('@elementText').its('lenght').should('eq', 12)
  })




  })






})