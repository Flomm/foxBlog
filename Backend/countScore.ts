export default function countScore(result: any[]): number {
  let scoreSum: number = 0;
  result.forEach((row) => {
    scoreSum += row.score;
  });
  return scoreSum;
}
