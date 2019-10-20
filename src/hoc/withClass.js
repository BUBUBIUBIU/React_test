import React from 'react';

// 这里WrappedComponent一定要大写，因为它是其他传进来的component的reference
// 第二个参数由你的设计思路决定，比如这里你是要设置style，那么就叫className
// 这个普通function return的东西才是functional component
const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
};

export default withClass;