/*
	This demo is intended to simulate flight.
*/
import * as cg from "../render/core/cg.js";
import { controllerMatrix, buttonState } from "../render/core/controllerInput.js";
import { lcb, rcb } from "../handle_scenes.js";

export const init = async model => {
	model.setTable(false);
	model.setRoom(false);

	//let ground = model.add('cube');
	let skybox = model.add('cube').scale(-500, -500, -500);
	let sun = model.add('cube');

	//make clouds
	const cloudGen = () => ['sphere',
		cg.mTranslate(Math.random()*2, Math.random()*1.1, Math.random()*2),
		[0.95,0.95,0.95]];

	let cloudTypeNum = 5;
	for(let i = 0; i < cloudTypeNum; i++){
		clay.defineMesh('cloud'+i, clay.combineMeshes(Array.from({length: 10}, () => cloudGen())));
	}

	//populate clouds
	let cloudNum = 100;
	let cloudPos = Array.from({length: cloudNum*3}, () => Math.random()*2000-1000);
	let clouds = [];
	for(let i = 0; i < cloudNum; i++){
		clouds.push(
			model.add('cloud'+(i%cloudTypeNum))
			.move(cloudPos[3*i], cloudPos[3*i+1], cloudPos[3*i+2])
			.scale(10, 10, 10)
		);
	}

	let bg_music = new Audio('../../media/sound/liftoff.mp3');
	let music_start = true;
	bg_music.play();

	model.animate(() => {
		//ground.flag('uGroundTexture');
		skybox.flag('uSkyTexture');
		sun.flag('uSunTexture');
		model.customShader(`
		uniform int uGroundTexture;
		uniform int uSkyTexture;
		uniform int uSunTexture;
         	--------------------------
         	if (uGroundTexture == 1){
			color *= 0.02;
			if (mod(abs(vAPos.x*50.), 0.3) < 0.01 || mod(abs(vAPos.z*50.+0.8*uTime), 0.3) < 0.01){
				color = vec3(0.746, 0.25, 0.746);
			}
		}
		if(uSkyTexture == 1){
			//galaxies
			//color = 0.25*(0.03+noise(20.*vAPos))
			color = mix(vec3(0.672,0.7,0.82), vec3(1., 1., 1.), noise(10.*vAPos)-0.85);
			//stars
			if(noise(600.*vAPos) > 0.46){
				color = vec3(0.9,0.9,0.9);
			}
		}
		if(uSunTexture == 1){
			color = mix(vec3(1.,1.,1.), vec3(1.,1.,0.4),
			max(0., max(abs(vAPos.x)/1.4,abs(vAPos.y)/1.4)));
		}
		`);
		//ground.identity().move(0,-1,0).scale(300,1,300);
		sun.identity().move(0,50,-299).scale(5,5,0.1);

		let ml = controllerMatrix.left;
		let mr = controllerMatrix.right;
		let controllerDist = mr.slice(12,15)-ml.slice(12,15);

		for(let i = 0; i < cloudNum*3; i += 3){
			cloudPos[i]   = ((cloudPos[i]  +1000+1)    %2000)-1000;
			cloudPos[i+1] = ((cloudPos[i+1]+1000+0.1)  %2000)-1000;
			cloudPos[i+2] = ((cloudPos[i+2]+1000+0.5)    %2000)-1000;
			clouds[Math.floor(i/3)].identity()
				.move(cloudPos[i], cloudPos[i+1], cloudPos[i+2]).scale(10,10,10);
		}
   });
}

