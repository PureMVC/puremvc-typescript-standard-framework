//
//  Controller.spec.ts
//  PureMVC TypeScript Standard
//
//  Copyright(c) 2024 Saad Shams <saad.shams@puremvc.org>
//  Your reuse is governed by the BSD-3-Clause License
//

import { Controller, IController, View, INotification, Notification } from "../../src";
import {ControllerTestCommand} from "./ControllerTestCommand";
import {ControllerTestVO} from "./ControllerTestVO";
import {ControllerTestCommand2} from "./ControllerTestCommand2";

/**
 * Test the PureMVC Controller class.
 *
 * @see ControllerTestVO
 * @see ControllerTestCommand
 */
describe("ControllerTest", () => {

    /**
     * Tests the Controller Singleton Factory Method
     */
    test("testGetInstance", () => {
        // Test Factory Method
        const controller: IController = Controller.getInstance(() => new Controller());

        // test assertions
        expect(controller).toBeDefined();
    });

    /**
     * Tests Command registration and execution.
     *
     * This test gets a Singleton Controller instance
     * and registers the ControllerTestCommand class
     * to handle 'ControllerTest' Notifications.
     *
     * It then constructs such a Notification and tells the
     * Controller to execute the associated Command.
     * Success is determined by evaluating a property
     * on an object passed to the Command, which will
     * be modified when the Command executes.
     */
    test("testRegisterAndExecuteCommand", () => {
        // Create the controller, register the ControllerTestCommand to handle 'ControllerTest' notes
        const controller: IController = Controller.getInstance(() => new Controller());
        controller.registerCommand("ControllerTest", () => new ControllerTestCommand());

        // Create a 'ControllerTest' note
        const vo = new ControllerTestVO(12);
        const notification: INotification = new Notification("ControllerTest", vo);

        // Tell the controller to execute the Command associated with the note
        // the ControllerTestCommand invoked will multiply the vo.input value
        // by 2 and set the result on vo.result
        controller.executeCommand(notification);

        // test assertions
        expect(vo.result).toBe(24);
    });

    /**
     * Tests Command registration and removal.
     *
     * Tests that once a Command is registered and verified
     * working, it can be removed from the Controller.
     */
    test("testRegisterAndRemoveCommand", () => {
        // Create the controller, register the ControllerTestCommand to handle 'ControllerTest' notes
        const controller: IController = Controller.getInstance(() => new Controller());
        controller.registerCommand("ControllerRemoveTest", () => new ControllerTestCommand());

        // Create a 'ControllerTest' note
        const vo = new ControllerTestVO(12);
        const notification = new Notification("ControllerRemoveTest", vo);

        // Tell the controller to execute the Command associated with the note
        // the ControllerTestCommand invoked will multiply the vo.input value
        // by 2 and set the result on vo.result
        controller.executeCommand(notification);

        // test assertions
        expect(vo.result).toBe(24);

        // Reset result
        vo.result = 0;

        // Remove the Command from the Controller
        controller.removeCommand("ControllerRemoveTest");

        // Tell the controller to execute the Command associated with the
        // note. This time, it should not be registered, and our vo result
        // will not change
        controller.executeCommand(notification);

        // test assertions
        expect(vo.result).toBe(0);
    });

    test("testHasCommand", () => {
        // register the ControllerTestCommand to handle 'hasCommandTest' notes
        const controller: IController = Controller.getInstance(() => new Controller());
        controller.registerCommand("hasCommandTest", () => new ControllerTestCommand());

        // test that hasCommand returns true for hasCommandTest notifications
        expect(controller.hasCommand("hasCommandTest")).toBeTruthy();

        // Remove the Command from the Controller
        controller.removeCommand("hasCommandTest");

        // test that hasCommand returns false for hasCommandTest notifications
        expect(controller.hasCommand("hasCommandTest")).toBeFalsy();
    });

    /**
     * Tests Removing and Reregistering a Command
     *
     * Tests that when a Command is re-registered that it isn't fired twice.
     * This involves, minimally, registration with the controller but
     * notification via the View, rather than direct execution of
     * the Controller's executeCommand method as is done above in
     * testRegisterAndRemove. The bug under test was fixed in AS3 Standard
     * Version 2.0.2. If you run the unit tests with 2.0.1 this
     * test will fail.
     */
    test("testReregisterAndExecuteCommand", () => {
        // Fetch the controller, register the ControllerTestCommand2 to handle 'ControllerTest2' notes
        const controller: IController = Controller.getInstance(() => new Controller());
        controller.registerCommand("ControllerTest2", () => new ControllerTestCommand2());

        // Remove the Command from the Controller
        controller.removeCommand("ControllerTest2");

        // Re-register the Command with the Controller
        controller.registerCommand("ControllerTest2", () => new ControllerTestCommand2());

        // Create a 'ControllerTest2' note
        const vo = new ControllerTestVO(12);
        const note = new Notification("ControllerTest2", vo);

        // retrieve a reference to the View from the same core.
        const view = View.getInstance(() => new View());

        // send the Notification
        view.notifyObservers(note);

        // test assertions
        // if the command is executed once the value will be 24
        expect(vo.result).toBe(24);

        // Prove that accumulation works in the VO by sending the notification again
        view.notifyObservers(note);

        // if the command is executed twice the value will be 48
        expect(vo.result).toBe(48);
    });

});
