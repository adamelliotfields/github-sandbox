import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
      esModule: false,
    },
    plugins: [
      nodeResolve({ extensions: ['.ts'] }),
      typescript({ useTsconfigDeclarationDir: true }),
    ],
  },
];
