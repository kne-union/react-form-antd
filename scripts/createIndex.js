const path = require('path');
const glob = require('pify')(require('glob'));
const fs =require('fs-extra');

glob(path.resolve(__dirname,'../src/fields/**/*.js')).then((files)=>{
  const filenames = files.map((dir)=>{
    return path.basename(dir,path.extname(dir));
  });
  const fileContent = `import Form from './Form';
export * from './Form';
export default Form;
export {default as preset} from './preset';
export {default as FormModal} from './FormModal';
export {default as ResetButton} from './ResetButton';
export {default as SubmitButton} from './SubmitButton';
${filenames.map((name)=>`
import ${name}$ from './fields/${name}';
export const ${name} = ${name}$;
  `).join('')}
export const fields = { ${filenames.join(', ')} };`

  return fs.writeFile(path.resolve(__dirname,'../src/index.js'),fileContent);
});

