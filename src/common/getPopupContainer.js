const getPopupContainer = (triggerNode) => {
    const findAntdPopupContainer = (el) => {
        if (el === document.body || !el.parentElement) {
            return document.body
        }
        const targetEl = [].slice.call(el.classList, 0).find((className) => ['ant-modal-body', 'ant-modal-content', 'ant-popover-content'].indexOf(className) > -1);
        if (targetEl) {
            return el;
        }
        return findAntdPopupContainer(el.parentElement);
    };
    return findAntdPopupContainer(triggerNode);
};

export default getPopupContainer;
