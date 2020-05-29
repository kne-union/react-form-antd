import Form from './Form';
export * from './Form';
export default Form;
export {default as preset} from './preset';
export {default as FormModal} from './FormModal';
export {default as ResetButton} from './ResetButton';
export {default as SubmitButton} from './SubmitButton';

import Avatar$ from './fields/Avatar';
export const Avatar = Avatar$;
  
import Cascader$ from './fields/Cascader';
export const Cascader = Cascader$;
  
import CheckboxGroup$ from './fields/CheckboxGroup';
export const CheckboxGroup = CheckboxGroup$;
  
import DatePicker$ from './fields/DatePicker';
export const DatePicker = DatePicker$;
  
import Input$ from './fields/Input';
export const Input = Input$;
  
import InputNumber$ from './fields/InputNumber';
export const InputNumber = InputNumber$;
  
import RadioGroup$ from './fields/RadioGroup';
export const RadioGroup = RadioGroup$;
  
import Select$ from './fields/Select';
export const Select = Select$;
  
import SelectFetch$ from './fields/SelectFetch';
export const SelectFetch = SelectFetch$;
  
import Switch$ from './fields/Switch';
export const Switch = Switch$;
  
import TextArea$ from './fields/TextArea';
export const TextArea = TextArea$;
  
import TreeSelect$ from './fields/TreeSelect';
export const TreeSelect = TreeSelect$;
  
export const fields = { Avatar, Cascader, CheckboxGroup, DatePicker, Input, InputNumber, RadioGroup, Select, SelectFetch, Switch, TextArea, TreeSelect };