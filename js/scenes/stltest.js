import * as cg from "../render/core/cg.js";
import { creeper_stl  } from "../../media/models/creeper.js";
import { pedestal_stl } from "../../media/models/pedestal.js";
import { amongus_stl  } from "../../media/models/amongus.js";

/*
   art gallery full of STLs
*/

export const init = async model => {
	model.setTable(false);
   let a = [-1, 0, 0, -1, 0, 0], A = [ 1, 0, 0,  1, 0, 0],
       b = [ 0,-1, 0,  0,-1, 0], B = [ 0, 1, 0,  0, 1, 0],
       c = [ 0, 0,-1,  0, 0,-1], C = [ 0, 0, 1,  0, 0, 1];
   clay.defineMesh('smooth_octahedron', clay.trianglesMesh([
      a,b,C, a,B,c, A,b,c, A,B,C, a,C,B, A,c,B, A,C,b, a,c,b
   ]));
   //let myObj = model.add('smooth_octahedron');
	clay.trianglesMeshFromSTL('creeper', creeper_stl);
	clay.trianglesMeshFromSTL('amongus', amongus_stl);
	clay.trianglesMeshFromSTL('pedestal', pedestal_stl);
	let creeper = model.add('creeper').color(0,1,0);
	let amongus = model.add('amongus').color(1,0,0);
	let pedestal_1 = model.add('pedestal');
	let pedestal_2 = model.add('pedestal');
	let pedestal_3 = model.add('pedestal');

   model.move(0,1.5,0).scale(.15).animate(() => {
      //myObj.identity().turnZ(model.time/2).turnY(model.time/2).turnZ(model.time);
	   creeper   .identity().move(-4,-4.25,-24).scale(.05).turnZ(3*Math.PI/2).turnX(model.time/2);
		amongus   .identity().move(4,-7,-24).scale(.1).turnX(3*Math.PI/2).turnZ(model.time);
		pedestal_1.identity().scale(.2).move(-40,-32,-100).turnX(Math.PI/2);
		pedestal_2.identity().scale(.2).move(0,-32,-100).turnX(Math.PI/2);
		pedestal_3.identity().scale(.2).move(40,-32,-100).turnX(Math.PI/2);
   });
}

