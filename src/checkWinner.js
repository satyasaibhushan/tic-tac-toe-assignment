export default (squares, n, pos, isX) => {
  let y = pos % n;
  let x = (pos - y) / n;
  let ele = "";
  let latestMove = isX ? "X" : "O";
  let elementsInLine = [];
  //column check
  for (let i = 0; i < n; i++) {
    if (!squares[x * n + i] || squares[x * n + i] != latestMove) break;
    elementsInLine.push(x * n + i);
    if (i == n - 1) return [true,elementsInLine];
  }
  elementsInLine = [];
  //row check
  for (let i = 0; i < n; i++) {
    if (!squares[i * n + y] || squares[i * n + y] != latestMove) break;
    elementsInLine.push(i * n + y);
    if (i == n - 1) return [true,elementsInLine];
  }
  elementsInLine = [];
  //diag 1
  if (x == y)
    for (let i = 0; i < n; i++) {
      if (!squares[i * n + i] || squares[i * n + i] != latestMove) break;
      elementsInLine.push(i * n + i);
      if (i == n - 1) return [true,elementsInLine];
    }
  elementsInLine = [];
  //diag 2
  if (x + y == n - 1) {
    for (let i = 0; i < n; i++) {
      if (!squares[i * n + n - 1 - i] || squares[i * n + n - 1 - i] != latestMove) break;
      elementsInLine.push(i * n + n - 1 - i);
      if (i == n - 1) return [true,elementsInLine];
    }
  }
  return [false,[]];
};
