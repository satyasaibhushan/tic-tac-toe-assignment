export default (squares, n, pos, isX) => {
    let y= pos%n;
    let x = (pos-y)/n;
    let ele = "";
    console.log(n,pos,isX,squares,x,y);
  let latestMove = isX ? "X" : "O";

  //column check
  for (let i = 0; i < n; i++) {
    if (!squares[x*n+i] ||squares[x*n+i] != latestMove) break;
    if (i == n - 1) return true;
  }
  //row check
  for (let i = 0; i < n; i++) {
    if (!squares[i*n+y] ||squares[i*n+y] != latestMove) break;
    if (i == n - 1) return true;
  }
  //diag 1
  if (x == y)
    for (let i = 0; i < n; i++) {
      if (!squares[i*n+i] ||squares[i*n+i] != latestMove) break;
      if (i == n - 1) return true;
    }
  //diag 2
  if (x + y == n - 1) {
    for (let i = 0; i < n; i++) {
      if (!squares[i*n + n - 1 - i] ||squares[i*n + n - 1 - i] != latestMove) break;
      if (i == n - 1) return true;
    }
  }
  return false;
};
