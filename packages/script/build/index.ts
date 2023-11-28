import { series, parallel, dest, src } from "gulp";
import delPath from "../utils/delpath";
import { pkgPath, componentPath } from "../utils/paths";
import autoprefixer from "gulp-autoprefixer";
import run from "../utils/run";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

//删除cjx-zdy-ui
export const remove = () => {
  return delPath(`${pkgPath}/packages/cjx-zdy-ui`)
};


//打包样式
export const buildStyle = () => {
  return src(`${componentPath}/src/**/style/**.scss`)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest(`${pkgPath}/packages/cjx-zdy-ui/lib/src`))
    .pipe(dest(`${pkgPath}/packages/cjx-zdy-ui/es/src`));
};

//打包组件
export const buildComponent = async () => {
  run("pnpm run build", componentPath);
}

export default series(
  async () => remove(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);
