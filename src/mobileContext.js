import {createContext, useContext} from 'react';
import {useIsMobile} from '@kne/responsive-utils';

/** 仅控制表单布局；字段弹层、字号等字段级移动端优化不读这里 */
export const FormMobileContext = createContext(undefined);

export const useFormMobile = () => useContext(FormMobileContext);

/** 标记当前组件树已处于一个 Form 内，内层 Form 渲染 div 避免 form 嵌套 */
export const FormNestContext = createContext(false);

export const useFormNest = () => useContext(FormNestContext);

export const useFormIsMobile = () => {
    const mobile = useFormMobile();
    const isMobile = useIsMobile();
    return mobile === false ? false : isMobile;
};
