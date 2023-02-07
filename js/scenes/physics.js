import * as cg from "../render/core/cg.js";
import { controllerMatrix, buttonState, joyStickState } from "../render/core/controllerInput.js";

/*********************************************************************************

This demo shows how you can do basic object manipulation with your controllers.


(1) Moving an object

    When you place your left controller inside the box, the box turns pink.

    Then when you squeeze the left trigger,
    the box turns red and moves together with your controller.


(2) Moving and rotating an object

    When you place your right controller inside the box, the box turns light blue.

    Then when you squeeze the right trigger,
    the box turns blue and both moves and rotates together with your controller.

*********************************************************************************/

let leftTriggerPrev = false;
let rightTriggerPrev = false;

let MP = cg.mTranslate(0,1,.5);
let A = [0,0,0];
let MA = cg.mIdentity();

export const init = async model => {

   // CREATE THE BOX.
   let box  = model.add('cube');
   //let ball = model.add('sphere');

   let gravity = -9.8;

   let boxPos_x = 0;
   let boxPos_y = 0;
   let boxPos_z = 0;

   let boxVel_x = 0.02;
   let boxVel_y = 0;
   let boxVel_z = 0;

   let timestep = 0.05;

   // FUNCTION TO RETURN TRUE IF A POINT IS INSIDE THE BOX, OTHERWISE FALSE.

   let isInBox = p => {

      // FIRST TRANSFORM THE POINT BY THE INVERSE OF THE BOX'S MATRIX.

      let q = cg.mTransform(cg.mInverse(box.getMatrix()), p);

      // THEN WE JUST NEED TO SEE IF THE RESULT IS INSIDE A UNIT CUBE.

      return q[0] >= -1 & q[0] <= 1 &&
             q[1] >= -1 & q[1] <= 1 &&
             q[2] >= -1 & q[2] <= 1 ;
   }

   model.animate(() => {

      // enable physics, unless you're holding the object

      let physics_on = true;

      // FETCH THE MATRIXES FOR THE LEFT AND RIGHT CONTROLLER.

      let ml = controllerMatrix.left;
      let mr = controllerMatrix.right;

      // EXTRACT THE LOCATION OF EACH CONTROLLER FROM ITS MATRIX,
      // AND USE IT TO SEE WHETHER THAT CONTROLLER IS INSIDE THE BOX.

      let isLeftInBox  = isInBox(ml.slice(12,15));
      let isRightInBox = isInBox(mr.slice(12,15));

      // IF NEITHER CONTROLLER IS INSIDE THE BOX, COLOR THE BOX WHITE.

      if (! isLeftInBox && ! isRightInBox)
         box.color(1,1,1);

      // IF THE LEFT CONTROLLER IS INSIDE THE BOX

      if (isLeftInBox) {

         // COLOR THE BOX PINK.

         box.color(1,.5,.5);

         // IF THE LEFT TRIGGER IS SQUEEZED

         let leftTrigger = buttonState.left[0].pressed;
	      if (leftTrigger) {
            physics_on = false;

            // COLOR THE BOX RED AND MOVE THE BOX.

            box.color(1,0,0);
            let B = ml.slice(12,15);
            if (! leftTriggerPrev)         // ON LEFT DOWN EVENT:
               A = B;                      // INITIALIZE PREVIOUS LOCATION.
            else
               MP = cg.mMultiply(cg.mTranslate(cg.subtract(B, A)), MP);

	    A = B;                         // REMEMBER PREVIOUS LOCATION.
         }
         leftTriggerPrev = leftTrigger;
      }

      // IF THE RIGHT CONTROLLER IS INSIDE THE BOX

      if (isRightInBox) {

         // COLOR THE BOX LIGHT BLUE.

         box.color(.5,.5,1);

	 // IF THE RIGHT TRIGGGER IS SQUEEZED

         let rightTrigger = buttonState.right[0].pressed;
	      if (rightTrigger) {
            physics_on = false;

	         // COLOR THE BOX BLUE AND MOVE AND ROTATE THE BOX.

            box.color(0,0,1);
            let MB = mr.slice();
            if (! rightTriggerPrev)        // ON RIGHT DOWN EVENT:
               MA = MB;                    // INITIALIZE PREVIOUS MATRIX.
            else
	       MP = cg.mMultiply(cg.mMultiply(MB, cg.mInverse(MA)), MP);

	    MA = MB;                       // REMEMBER PREVIOUS MATRIX.
         }
         rightTriggerPrev = rightTrigger;
      }

      // do physics
   
      if(physics_on){
         //let current_pos = MP.slice(12,15);
         let current_pos = [...A];

         boxVel_y += gravity*timestep*0.001;
         current_pos[0] += boxVel_x;
         current_pos[1] += boxVel_y;
         current_pos[2] += boxVel_z;

         if(Math.abs(current_pos[0]) > 1){
            boxVel_x *= -0.7;
         }
         if(Math.abs(current_pos[2]) > 1){
            boxVel_z *= -0.7;
         }
         if(Math.abs(current_pos[1]) > 0.8){
            boxVel_y *= -0.7;
         }

         MP = cg.mMultiply(cg.mTranslate(cg.subtract(current_pos, A)), MP);
         A = current_pos;

         //box.setMatrix(MP);
      }

      //display box

      box.setMatrix(MP).scale(.2);
      physics_on = true;
      
   });
}

