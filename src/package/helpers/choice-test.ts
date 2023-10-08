// import { choiceTestCount, tests } from "@/intefaces/IGame";
// import { getRandomNumber } from "@/package/helpers/random-numbers";
//
// const getRandomTest = (array: Array<tests>): tests => {
//   return array[Math.floor(Math.random() * array.length)];
// };
//
// export default function choiceTest(
//   count: choiceTestCount,
//   allUsersCount: number
// ): tests {
//   const livePlayersCount = allUsersCount - count;
//
//   switch (count) {
//     case 1:
//       if (livePlayersCount > 0) {
//         return getRandomTest(["scam", "bowls", "dragon", "cube"]);
//       } else {
//         return getRandomTest(["scam", "dragon"]);
//       }
//
//     case 2:
//       if (livePlayersCount > 0) {
//       } else {
//       }
//   }
// }
