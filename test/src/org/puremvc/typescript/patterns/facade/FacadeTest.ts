/*
 PureMVC TypeScript by Frederic Saunier <frederic.saunier@puremvc.org>
 PureMVC - Copyright(c) 2006-2012 Futurescale, Inc., Some rights reserved.
 Your reuse is governed by the Creative Commons Attribution 3.0 License
*/

/**
 * Test the PureMVC Facade class.
 *
 * @see puremvc.FacadeTestVO
 * @see puremvc.FacadeTestCommand
 */
var FacadeTest = new YUITest.TestCase
(
	{

		/**
		 * The name of the test case - if not provided, one is automatically
		 * generated by the YUITest framework.
		 *
		 * @type {String}
		 * @private
		 */
		name: "PureMVC Facade class tests",

		/**
		 * Sets up data that is needed by each test.
		 */
		setUp: function()
		{
		},

		/**
		 * Cleans up everything that was created by setUp().
		 */
		tearDown: function()
		{
		},

		/**
		 * Tests the Facade Singleton Factory Method
		 */
		testGetInstance: function()
		{
		var Facade = extract("puremvc.Facade");

			// Test Factory Method
			var facade/*Facade*/ = Facade.getInstance();

			// test assertions
			YUITest.Assert.isNotUndefined
			(
				facade,
				"Expecting facade not to be undefined"
			);

			YUITest.Assert.isInstanceOf
			(
				Facade,
				facade,
				"Expecting instance is instance of Facade"
			);
		},

		/**
		 * Tests Command registration and execution via the Facade.
		 *
		 * This test gets the Singleton Facade instance
		 * and registers the FacadeTestCommand class
		 * to handle 'FacadeTest' Notifications.
		 *
		 * It then sends a notification using the Facade.
		 * Success is determined by evaluating
		 * a property on an object placed in the body of
		 * the Notification, which will be modified by the Command.
		 *
		 */
		testRegisterCommandAndSendNotification: function()
		{
			var Facade = extract("puremvc.Facade");

			// Create the Facade, register the FacadeTestCommand to
			// handle 'FacadeTest' notifications
			var facade/*Facade*/ = Facade.getInstance();
			facade.registerCommand( 'FacadeTestNote', FacadeTestCommand );

			// Send notification. The Command associated with the event
			// (FacadeTestCommand) will be invoked, and will multiply 
			// the vo.input value by 2 and set the result on vo.result
			var vo/*FacadeTestVO*/ = new FacadeTestVO( 32 );
			facade.sendNotification( 'FacadeTestNote', vo );

			// test assertions
			YUITest.Assert.areEqual
			(
				64,
				vo.result,
				"Expecting vo.result == 64"
			);
		},

		/**
		 * Tests Command removal via the Facade.
		 *
		 *
		 * This test gets the Singleton Facade instance
		 * and registers the FacadeTestCommand class
		 * to handle 'FacadeTest' Notifcations. Then it removes the command.
		 *
		 *
		 * It then sends a Notification using the Facade.
		 * Success is determined by evaluating a property on an object placed
		 * in the body of the Notification, which will NOT be modified by the
		 * Command.
		 *
		 */
		testRegisterAndRemoveCommandAndSendNotification: function()
		{
			var Facade = extract("puremvc.Facade");

			// Create the Facade, register the FacadeTestCommand to
			// handle 'FacadeTest' events
			var facade/*Facade*/ = Facade.getInstance();
			facade.registerCommand( 'FacadeTestNote', FacadeTestCommand );
			facade.removeCommand( 'FacadeTestNote' );

			// Send notification. The Command associated with the event
			// (FacadeTestCommand) will NOT be invoked, and will NOT multiply 
			// the vo.input value by 2 
			var vo/*Object*/ = new FacadeTestVO( 32 );
			facade.sendNotification( 'FacadeTestNote', vo );

			// test assertions
			YUITest.Assert.areNotEqual
			(
				64,
				vo.result,
				"Expecting vo.result != 64"
			);
		},

		/**
		 * Tests the registering and retrieving Model proxies via the Facade.
		 *
		 *
		 * Tests <code>registerProxy</code> and <code>retrieveProxy</code> in the same test.
		 * These methods cannot currently be tested separately
		 * in any meaningful way other than to show that the
		 * methods do not throw exception when called.
		 */
		testRegisterAndRetrieveProxy: function()
		{
			var Facade = extract("puremvc.Facade");
			var Proxy = extract("puremvc.Proxy");

			// register a proxy and retrieve it.
			var facade/*Facade*/ = Facade.getInstance();
			facade.registerProxy( new Proxy( 'colors', ['red', 'green', 'blue'] ) );

			var proxy/*Proxy*/ = facade.retrieveProxy( 'colors' );

			YUITest.Assert.isInstanceOf
			(
				Proxy,
				proxy,
				"Expecting proxy is Proxy"
			);

			// retrieve data from proxy
			var data/*Array*/ = proxy.getData();

			// test assertions
			YUITest.Assert.isNotUndefined
			(
				data,
				"Expecting data not null"
			);

			YUITest.Assert.isArray
			(
				data,
				"Expecting data is Array"
			);

			YUITest.Assert.areEqual
			(
				3,
				data.length,
				"Expecting data.length == 3"
			);

			YUITest.Assert.areEqual
			(
				'red',
				data[0],
				"Expecting data[0] == 'red'"
			);

			YUITest.Assert.areEqual
			(
				'green',
				data[1],
				"Expecting data[1] == 'green'"
			);

			YUITest.Assert.areEqual
			(
				'blue',
				data[2],
				"Expecting data[2] == 'blue'"
			);
		},

		/**
		 * Tests the removing Proxies via the Facade.
		 */
		testRegisterAndRemoveProxy: function()
		{
		var Facade = extract("puremvc.Facade");
		var Proxy = extract("puremvc.Proxy");

			// register a proxy, remove it, then try to retrieve it
			var facade/*Facade*/ = Facade.getInstance();
			var proxy/*Proxy*/ = new Proxy( 'sizes', ['7', '13', '21'] );
			facade.registerProxy( proxy );

			// remove the proxy
			var removedProxy/*Proxy*/ = facade.removeProxy('sizes');

			// test assertions

			// assert that we removed the appropriate proxy
			YUITest.Assert.areEqual
			(
				'sizes',
				removedProxy ? removedProxy.getProxyName() : null,
				"Expecting removedProxy.getProxyName() == 'sizes'"
			);

			// make sure we can no longer retrieve the proxy from the model
			proxy = facade.retrieveProxy( 'sizes' );

			// assert that the proxy is no longer retrievable
			YUITest.Assert.isNull( proxy, "Expecting proxy === null" );
		},


		/**
		 * Tests registering, retrieving and removing Mediators via the Facade.
		 */
		testRegisterRetrieveAndRemoveMediator: function()
		{
			var Facade = extract("puremvc.Facade");
			var Mediator = extract("puremvc.Mediator");

			// register a mediator, remove it, then try to retrieve it
			var facade/*Facade*/ = Facade.getInstance();
			facade.registerMediator( new Mediator( Mediator.NAME, new Object() ) );

			// retrieve the mediator
			YUITest.Assert.isNotNull
			(
				facade.retrieveMediator( Mediator.NAME ),
				"Expecting facade.retrieveMediator( Mediator.NAME ) !== null"
			);

			// remove the mediator
			var removedMediator/*Mediator*/ = facade.removeMediator(Mediator.NAME);

			// assert that we have removed the appropriate mediator
			YUITest.Assert.areEqual
			(
				Mediator.NAME,
				removedMediator ? removedMediator.getMediatorName() : null,
				"Expecting removedMediator.getMediatorName() == Mediator.NAME"
			);

			// assert that the mediator is no longer retrievable
			YUITest.Assert.isNull
			( 
				facade.retrieveMediator( Mediator.NAME ),
				"Expecting facade.retrieveMediator( Mediator.NAME ) === null )"
			);
		},

		/**
		 * Tests the hasProxy Method
		 */
		testHasProxy: function()
		{
			var Facade = extract("puremvc.Facade");
			var Proxy = extract("puremvc.Proxy");

			// register a Proxy
			var facade/*Facade*/ = Facade.getInstance();
			facade.registerProxy( new Proxy( 'hasProxyTest', [1,2,3] ) );

			// assert that the model.hasProxy method returns true
			// for that proxy name
			YUITest.Assert.isTrue
			(
				facade.hasProxy('hasProxyTest'),
				"Expecting facade.hasProxy('hasProxyTest') === true"
			);
		},

		/**
		 * Tests the hasMediator Method
		 */
		testHasMediator: function()
		{
			var Facade = extract("puremvc.Facade");
			var Mediator = extract("puremvc.Mediator");

			// register a Mediator
			var facade/*Facade*/ = Facade.getInstance();
			facade.registerMediator( new Mediator( 'facadeHasMediatorTest', new Object() ) );

			// assert that the facade.hasMediator method returns true
			// for that mediator name
			YUITest.Assert.isTrue
			(
				facade.hasMediator('facadeHasMediatorTest'),
				"Expecting facade.hasMediator('facadeHasMediatorTest') === true"
			);

			facade.removeMediator( 'facadeHasMediatorTest' );

			// assert that the facade.hasMediator method returns false
			// for that mediator name
			YUITest.Assert.isFalse
			(
				facade.hasMediator('facadeHasMediatorTest'),
				"Expecting facade.hasMediator('facadeHasMediatorTest') === false"
			);
		},

		/**
		 * Test hasCommand method.
		 */
		testHasCommand: function()
		{
			var Facade = extract("puremvc.Facade");

			// register the ControllerTestCommand to handle 'hasCommandTest' notes
			var facade/*Facade*/ = Facade.getInstance();
			facade.registerCommand( 'facadeHasCommandTest', FacadeTestCommand );

			// test that hasCommand returns true for hasCommandTest notifications
			YUITest.Assert.isTrue
			(
				facade.hasCommand('facadeHasCommandTest'),
				"Expecting facade.hasCommand('facadeHasCommandTest') === true"
			);

			// Remove the Command from the Controller
			facade.removeCommand('facadeHasCommandTest');

			// test that hasCommand returns false for hasCommandTest notifications
			YUITest.Assert.isFalse
			(
				facade.hasCommand('facadeHasCommandTest'),
				"Expecting facade.hasCommand('facadeHasCommandTest') === false"
			);
		}
	}
);