import { controllerMatrix, buttonState, joyStickState } from "../render/core/controllerInput.js";

export const init = async model => {
	let head = model.add('cube').color(.5,.5,.5).move(0,1.5,0);
	let eye_left = head.add();
	eye_left.add('tubeZ').color(1,1,1).move(-0.4,0.4,1).scale(.3);
	eye_left.add('sphere').color(0,0,0).move(-0.4,0.45,1.25).scale(.15);
	let eye_right = head.add();
	eye_right.add('tubeZ').color(1,1,1).move(0.4,0.4,1).scale(.3);
	eye_right.add('sphere').color(0,0,0).move(0.4,0.45,1.25).scale(.15);

	let body = model.add();
	let torso = body.add();
	let neck = torso.add('tubeY').color(.5,.5,.5).move(0,0,0).scale(.1,.25,.1);
	let neck_joint = torso.add('sphere').color(0,1,0).move(0,-0.2,0).scale(.2);
	let shoulder_l = torso.add();
	let shoulder_joint_l = torso.add('sphere').color(1,0,0).move(1.5,0,0).scale(.2);
	let shoulder_r = torso.add();
	let shoulder_joint_r = torso.add('sphere').color(0,1,0).move(-1.5,0,0).scale(.2);
	let elbow_l = model.add('sphere').color(0,0,1).move(-1.5,-.5,0).scale(.2);
	let elbow_r = model.add('sphere').color(1,0,0).move(1.5,-.5,0).scale(.2);
	let back_joint = model.add('sphere').color(0,0,1).move(0,-1,0).scale(.2);

	let arm_l = torso.add();
	
	let arm_r = torso.add();

	model.move(0,1.5,0).scale(.3).animate(() => {
		head.identity().scale(.5).move(0,1.5,0).turnY(Math.sin(model.time));
		//torso.identity().turnY(Math.sin(model.time));
	});
}

