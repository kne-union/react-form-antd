import Form from './Form';

import Avatar$ from './fields/Avatar';
import Cascader$ from './fields/Cascader';
import Checkbox$ from './fields/Checkbox';
import CheckboxGroup$ from './fields/CheckboxGroup';
import DatePicker$ from './fields/DatePicker';
import Input$ from './fields/Input';
import InputNumber$ from './fields/InputNumber';
import RadioGroup$ from './fields/RadioGroup';
import Select$ from './fields/Select';
import SelectFetch$ from './fields/SelectFetch';
import Switch$ from './fields/Switch';
import TextArea$ from './fields/TextArea';
import TreeSelect$ from './fields/TreeSelect';
import Upload$ from './fields/Upload';

export * from './Form';
export default Form;
export {default as preset} from './preset';
export {default as FormModal} from './FormModal';
export {default as ResetButton} from './ResetButton';
export {default as SubmitButton} from './SubmitButton';

export const Avatar = Avatar$;
export const Cascader = Cascader$;
export const Checkbox = Checkbox$;
export const CheckboxGroup = CheckboxGroup$;
export const DatePicker = DatePicker$;
export const Input = Input$;
export const InputNumber = InputNumber$;
export const RadioGroup = RadioGroup$;
export const Select = Select$;
export const SelectFetch = SelectFetch$;
export const Switch = Switch$;
export const TextArea = TextArea$;
export const TreeSelect = TreeSelect$;
export const Upload = Upload$;

export const fields = { Avatar, Cascader, Checkbox, CheckboxGroup, DatePicker, Input, InputNumber, RadioGroup, Select, SelectFetch, Switch, TextArea, TreeSelect, Upload };