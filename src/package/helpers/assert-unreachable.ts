export default function assertUnreachable(x: never): never {
  throw new Error(`Didn't ${x} expect to get here`);
}
