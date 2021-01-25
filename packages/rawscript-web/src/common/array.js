export function swap(plist, iA, iB) {
  const list = [...plist];
  [list[iA], list[iB]] = [list[iB], list[iA]];
  return list;
}
