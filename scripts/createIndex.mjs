import path from 'path';
import fs from 'fs-extra';
import {glob} from "glob";

glob('src/fields/**/*.js').then((files)=>{
  const filenames = files.map((dir)=>{
    return path.basename(dir,path.extname(dir));
  });
  const fileContent = `import Form from './Form';
${filenames.map((name)=>`
import ${name} from './fields/${name}';`).join('')}

export * from './Form';
export default Form;
export const FormAntd = Form;
export {default as preset} from './preset';
export {default as ResetButton} from './ResetButton';
export {default as SubmitButton} from './SubmitButton';
export {default as CancelButton} from './CancelButton';
export {${filenames.join(', ')}};

export const fields = { ${filenames.join(', ')} };`
  return fs.writeFile(path.resolve('src/index.js'),fileContent);
});

