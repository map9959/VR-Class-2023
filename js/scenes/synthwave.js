/*
	This demo shows you how to procedurally texture
	just one object in your scene.

	The key is to declare a flag 'uTextured' in your
	fragment shader, which is set to 1 only for the
	object to be textured, and is otherwise set to 0.
*/
export const init = async model => {
   model.setTable(false);
	model.setRoom(false);

   let ground = model.add('cube');
	let skybox1 = model.add('cube');
	let skybox2 = model.add('cube');
	let skybox3 = model.add('cube');
	let skybox4 = model.add('cube');
	let sun = model.add('cube');

	let bg_music = new Audio('../../media/sound/sweden.mp3');
	let music_start = true;
	bg_music.play();

   model.animate(() => {
      ground.flag('uGroundTexture');
		skybox1.flag('uSkyTexture');
		skybox2.flag('uSkyTexture');
		skybox3.flag('uSkyTexture');
		skybox4.flag('uSkyTexture');
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
				color = 0.25*(0.03+noise(20.*vAPos))
				*mix(vec3(0.,0.,1.), vec3(0.437, 0.16, 0.387), noise(vAPos));
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
      ground.identity().move(0,-1,0).scale(300,1,300);
		skybox1.identity().move(0,0,300).scale(3000,3000,0.1);
		skybox2.identity().move(0,0,-300).scale(3000,3000,0.1);
		skybox3.identity().move(300,0,0).scale(0.1,3000,3000);
		skybox4.identity().move(-300,0,0).scale(0.1,3000,3000);
		sun.identity().move(0,6,-299).scale(5,5,0.1);
   });
}

