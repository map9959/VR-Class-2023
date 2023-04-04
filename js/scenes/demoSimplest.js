/*****************************************************************

   This is the simplest "hello world" example:
   creating a single cube.

*****************************************************************/

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
	let shoulder_l = torso.add('tubeX').color(.5,.5,.5).turnZ(.15).move(-0.65,-0.2,0).scale(.5,.1,.1);
	let shoulder_joint_l = torso.add('sphere').color(1,0,0).move(1,-.4,0).scale(.2);
	let shoulder_r = torso.add('tubeX').color(.5,.5,.5).turnZ(-.15).move(0.65,-0.2,0).scale(.5,.1,.1);
	let shoulder_joint_r = torso.add('sphere').color(1,0,0).move(-1,-.4,0).scale(.2);
	let back = torso.add('tubeY').color(.5,.5,.5).move(0,-1,0).scale(.1,1,.1);
	let back_joint = torso.add('sphere').color(0,0,1).move(0,-2,0).scale(.2);

	let arm_l = shoulder_joint_l.add();
	let upperarm_l = arm_l.add('tubeY').color(.5,.5,.5).move(0.5,-3,0).turnZ(.15).scale(.5,3,.5);
	let elbow_l = arm_l.add('sphere').color(0,0,1).move(1,-5.5,0);
	let forearm_l = elbow_l.add('tubeY').color(.5,.5,.5).move(-0.5,-3,0).turnZ(-.15).scale(.5,3,.5);
	
	let arm_r = shoulder_joint_r.add();
	let upperarm_r = arm_r.add('tubeY').color(.5,.5,.5).move(-0.5,-3,0).turnZ(-.15).scale(.5,3,.5);
	let elbow_r = arm_r.add('sphere').color(0,0,1).move(-1,-5.5,0);
	let forearm_r = elbow_r.add('tubeY').color(.5,.5,.5).move(0.5,-3,0).turnZ(.15).scale(.5,3,.5);
	
	model.move(0,1.5,0).scale(.3).animate(() => {
		head.identity().scale(.5).move(0,1.5,0).turnY(Math.sin(model.time));
		torso.identity().turnY(Math.sin(-model.time));
		arm_r.identity().turnX(Math.sin(-model.time));
		elbow_r.identity().move(-1,-5.5,0).turnX(Math.min(0,Math.sin(model.time)));
		elbow_l.identity().move(1,-5.5,0).turnX(Math.min(0,Math.sin(-model.time)));
	});
}

