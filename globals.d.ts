// Next ships `declare module '*.module.css'` in next/types/global.d.ts but no
// declaration for plain `*.css`. TypeScript 5.6 added ts(2882), which flags a
// side-effect import with no matching module declaration, so editors running a
// bundled TS >= 5.6 report `import "./globals.css"` as an error even though the
// project itself pins TypeScript 5.1.6 and `tsc` passes.
//
// Declaring the module here is the upstream-recommended fix and is inert for
// the build: next/webpack resolves the stylesheet, not TypeScript.
declare module "*.css";
