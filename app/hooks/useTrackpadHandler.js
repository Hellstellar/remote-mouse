import { EMouseEvents } from "../constants/enums";

const useTrackpadHandler = (remoteMouseService) => {
    const tapDuration = 100;
    const sensitivity = 3
    const deltaPosition = {
        x: 0,
        y: 0,
    }
    const previousPosition = {
        x: 0,
        y: 0,
    }
    let isTouched = false
    let touchStartTimestamp = null;
    let prevMoveTouchTimestamp = null

    const _calculateVelocity = (timestamp) => {
        const time = timestamp - prevMoveTouchTimestamp
        prevMoveTouchTimestamp = timestamp
        const distance = Math.hypot(deltaPosition.x, deltaPosition.y)
        const velocity = distance/time
        if(velocity < 1)
            return 1
        return velocity.toFixed(sensitivity)
    };

    const _changeDeltaPosition = (locationX, locationY) => {
        const currentPositionX = (locationX).toFixed(sensitivity)
        const currentPositionY = (locationY).toFixed(sensitivity)
        const deltaX = (currentPositionX - previousPosition.x)
        const deltaY = (currentPositionY - previousPosition.y)
        previousPosition.x = currentPositionX
        previousPosition.y = currentPositionY
        if(!isTouched) {
            isTouched = true
            return
        }
        deltaPosition.x = deltaX > 0 && deltaX < 1 ? 1 : deltaX
        deltaPosition.y = deltaY > 0 && deltaY < 1 ? 1 : deltaY
    };

    const _isTap = () => {
        return touchStartTimestamp && (Date.now() - touchStartTimestamp < tapDuration);
    }

    const _handleTrackpadTap = (touches) => {
        if(_isTap()){
            if(touches.length === 2)
                remoteMouseService.sendMessage(EMouseEvents.RIGHT_CLICK)
            else
                remoteMouseService.sendMessage(EMouseEvents.LEFT_CLICK)
        }
    }

    const onStartShouldSetResponder = nativeEvent => {
        touchStartTimestamp = Date.now();
        prevMoveTouchTimestamp = nativeEvent.timestamp
        return true;
    }

    const handleTrackpadMove = nativeEvent => {
        _changeDeltaPosition(nativeEvent.locationX, nativeEvent.locationY);
        const velocity = _calculateVelocity(nativeEvent.timestamp)
        const scaledDeltaX = (deltaPosition.x * velocity).toFixed()
        const scaledDeltaY = (deltaPosition.y * velocity).toFixed()
        const message = `MOVE ${scaledDeltaX} ${scaledDeltaY}`
        if(deltaPosition.x || deltaPosition.y)
            remoteMouseService.sendMessage(message)
    }


    const handleTouchRelease = nativeEvent => {
        isTouched = false
        _handleTrackpadTap(nativeEvent.touches)
        previousPosition.x = 0;
        previousPosition.y = 0;
    }

    return {handleTrackpadMove, handleTouchRelease, onStartShouldSetResponder}
}

export default useTrackpadHandler;