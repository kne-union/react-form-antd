import Form from './Form';

import Upload from './fields/Upload';
import TreeSelect from './fields/TreeSelect';
import TimePicker from './fields/TimePicker';
import TextArea from './fields/TextArea';
import Switch from './fields/Switch';
import Select from './fields/Select';
import RadioGroup from './fields/RadioGroup';
import InputNumber from './fields/InputNumber';
import Input from './fields/Input';
import DatePickerToday from './fields/DatePickerToday';
import DatePicker from './fields/DatePicker';
import CheckboxGroup from './fields/CheckboxGroup';
import Checkbox from './fields/Checkbox';
import Cascader from './fields/Cascader';
import Avatar from './fields/Avatar';

export * from './Form';
export default Form;
export const FormAntd = Form;
export {default as preset} from './preset';
export {default as ResetButton} from './ResetButton';
export {default as SubmitButton} from './SubmitButton';
export {default as CancelButton} from './CancelButton';
export {Upload, TreeSelect, TimePicker, TextArea, Switch, Select, RadioGroup, InputNumber, Input, DatePickerToday, DatePicker, CheckboxGroup, Checkbox, Cascader, Avatar};

export const fields = { Upload, TreeSelect, TimePicker, TextArea, Switch, Select, RadioGroup, InputNumber, Input, DatePickerToday, DatePicker, CheckboxGroup, Checkbox, Cascader, Avatar };