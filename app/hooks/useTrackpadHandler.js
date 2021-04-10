import { EMouseEvents } from "../constants/enums";

const useTrackpadHandler = (remoteMouseService) => {
    const tapDuration = 100;
    let prevPositionX = 0;
    let prevPositionY = 0;
    let isTouched = false
    let startPress = null;


    const _getDeltaPositionXY = ({locationX, locationY}) => {
        const currentPositionX = (locationX).toFixed()
        const currentPositionY = (locationY).toFixed()
        const deltaX = currentPositionX - prevPositionX
        const deltaY = currentPositionY - prevPositionY
        prevPositionX = currentPositionX
        prevPositionY = currentPositionY
        if(!isTouched) {
            isTouched = true;
            return [0, 0]
        }
        return [deltaX, deltaY];
    };

    const _isTap = () => {
        return startPress && (Date.now() - startPress < tapDuration);
    }


    const onStartShouldSetResponder = () => {
        startPress = Date.now();
        return true;
    }

    const handleTrackpadMove = nativeEvent => {
        const [deltaX, deltaY] = _getDeltaPositionXY(nativeEvent);
        const message = `MOVE ${deltaX} ${deltaY}`
        if(deltaX && deltaY)
            remoteMouseService.sendMessage(message)
    }

    const handleTrackpadTap = () => {
        const message = EMouseEvents.LEFT_CLICK;
        remoteMouseService.sendMessage(message)
    }

    const handleTouchRelease = () => {
        isTouched = false
        if(_isTap())
            handleTrackpadTap()
        prevPositionX = 0;
        prevPositionY = 0;
    }

    return {handleTrackpadMove, handleTouchRelease, onStartShouldSetResponder}
}

export default useTrackpadHandler;