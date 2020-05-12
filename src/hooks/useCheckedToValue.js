export default ({ckecked, ...props}) => {
    return {
        ...props,
        value: ckecked
    };
};
