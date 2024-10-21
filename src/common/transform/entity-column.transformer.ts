export const bigint2StringTransformer = {
  to: (value: bigint) => value && value.toString(),
  from: (value: string) => value && BigInt(value),
}