import { animated, useTransition } from 'react-spring'

const TransitionProvider = ({style,inProp,className,duration,height,children}) => {
    const transDuration = duration ? duration : 100;


    const styles = {
        opacity: {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 },
        },
        height: {
            from: { maxHeight: '0px', },
            enter: { maxHeight: height || '165px', },
            leave: { maxHeight: '0px', },
        },
        rotateX: {
            from: { transform: 'rotateX(90deg)', },
            enter: { transform: 'rotateX(0deg)', },
            leave: { transform: 'rotateX(90deg)' },
        },

        right: {
            from: {right: '-630px'},
            enter: {right: '0'},
            leave: {right: '-630px'},
        },
        translateX: {
            from: {translateX: '100%'},
            enter: {translateX: '0%'},
            leave: {translateX: '100%'},
        }
    }

    const transition = useTransition(inProp, {...styles[style],config: {duration: transDuration}})


    return (
        <>
            {transition((style, item) => item ?
                <animated.div
                    style={style}
                    className={className ? className : ''}
                >{children}</animated.div> : '')}
        </>
    )
}

export default TransitionProvider