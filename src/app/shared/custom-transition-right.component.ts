// custom-transition.animation.ts
// github.com/bergben/ng2-page-transition

import {trigger, state, animate, style, transition, AnimationEntryMetadata} from '@angular/core';

// export function customTransition():AnimationEntryMetadata {
//   return slideOutAndIn();
// }

// function slideOutAndIn():AnimationEntryMetadata {
//   return trigger('ng2ElementState', [
//     state('leave', style({
//         position:'fixed', 
//         width:'100%'
//     })),
//     state('enter', style({
//         position:'fixed', 
//         width:'100%'
//     })),
//     transition('* => enter', [
//         style({transform: 'translateX(100%)'}),
//         animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
//     ]),
//     transition('* => leave', [
//       style({transform: 'translateX(0%)'}),
//       animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
//     ]),
//   ]);
// }

export const customTransitionRight: AnimationEntryMetadata =
    trigger('routeAnimation', [
      state('*',
          style({
               opacity: 1,
               transform: 'translateX(0)'
          })
          ),
          transition(':enter', [
            style({
              opacity: 0,
              transform: 'translateX(100%)'
            }),
          animate('0.5s ease-in')
    ]),
    transition (':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
    ]) 
