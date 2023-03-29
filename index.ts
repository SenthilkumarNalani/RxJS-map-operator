import { forkJoin } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';
// The map() operator:
// Now, let's have a look at the map operator, which is a counterpart of the one available(map method) in JavaScript arrays. Namely, the 'map' operator.
// So, for each emitted value, the 'map' operator can provide a new value. The new value can be calculated based on the value emitted by the source or just a new unrelated value.
// As it was with the 'filter' operator, the 'map' operator also isn't interested in the error and complete notifications, which are also reemitted to the output in an unchanged form.
// Once again, we first subscribe to the Observable created by applying the 'map' operator. Then, underneath, it will subscribe to our number generating Observable.
// It's a very simple operator, which is useful to organize our code better and make our Observables emit the values the way we want them to.

// const randomName$ = ajax<any>(
//   'https://random-data-api.com/api/name/random_name'
// );
// const randomNation$ = ajax<any>(
//   'https://random-data-api.com/api/nation/random_nation'
// );
// const randomFood$ = ajax<any>(
//   'https://random-data-api.com/api/food/random_food'
// );

// // Output: AjaxResponse{originalEvent: {…}, xhr: {…}, request: {…}, type: "download_load", …}
// randomName$.subscribe((value) => console.log(value));
// // Output: AjaxResponse{originalEvent: {…}, xhr: {…}, request: {…}, type: "download_load", …}
// randomNation$.subscribe((value) => console.log(value));
// // Output: AjaxResponse{originalEvent: {…}, xhr: {…}, request: {…}, type: "download_load", …}
// randomFood$.subscribe((value) => console.log(value));

// forkJoin([randomName$, randomNation$, randomFood$]).subscribe(
//   ([nameAjax, nationAjax, foodAjax]) => {
//     console.log(
//       `${nameAjax.response.first_name} is from ${nationAjax.response.capital} and likes to eat ${foodAjax.response.dish}`
//     );
//   }
// );

// Note: Each Ajax response above has this complicated path to the data that we are interested in. So, we can use the 'map' operator to make a new Observable, which will emit just the parts of the response that we need.

const randomFirstName$ = ajax<any>(
  'https://random-data-api.com/api/name/random_name'
).pipe(map((ajaxResponse) => ajaxResponse.response.first_name));

const randomCapital$ = ajax<any>(
  'https://random-data-api.com/api/nation/random_nation'
).pipe(map((ajaxResponse) => ajaxResponse.response.capital));

const randomDish$ = ajax<any>(
  'https://random-data-api.com/api/food/random_food'
).pipe(map((ajaxResponse) => ajaxResponse.response.dish));

// And we can see that the result is the same, while the code is much nicer to read and to work with.
// Summarizing, the 'map' operator can be used to transform the values into something else.
// In this example we used it to extract the needed parts of the Ajax responses so the resulting Observables were much easier to use in our context.

forkJoin([randomFirstName$, randomCapital$, randomDish$]).subscribe(
  ([firstName, capital, dish]: [string, string, string]) =>
    console.log(`${firstName} is from ${capital} and likes to eat ${dish}`)
);
