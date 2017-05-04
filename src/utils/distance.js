function distance(a, b) {
  const ca = a.center();
  const cb = b.center();

  const dx = ca.x - cb.x;
  const dy = ca.y - cb.y;

  return Math.sqrt(dx * dx + dy * dy);
}

export default distance;
