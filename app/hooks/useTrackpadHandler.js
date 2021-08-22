import {EMouseEvents} from "../constants/enums";

const useTrackpadHandler = (remoteMouseService, sensitivity) => {
    const tapDuration = 300;
    const doubleTapIntervalDuration = 1000;
    const tapErrorMargin = 5;
    const precision = 3;
    const deltaPosition = {
        x: 0,
        y: 0,
    }
    const previousPosition = {
        x: 0,
        y: 0,
    }
    let isTouched = false
    let doubleTapHot = false
    let drag = false
    let doubleTapInterval = null;
    let touchStartTimestamp = null;
    let prevMoveTouchTimestamp = null
    let numberOfTouches = 0;

    const _calculateVelocity = (timestamp) => {
        const time = timestamp - prevMoveTouchTimestamp
        prevMoveTouchTimestamp = timestamp
        const distance = Math.hypot(deltaPosition.x, deltaPosition.y)
        const velocity = (distance / time) * sensitivity
        if (velocity < 1)
            return 1
        return velocity.toFixed(precision)
    };

    const _changeDeltaPosition = (locationX, locationY) => {
        const currentPositionX = (locationX).toFixed(precision)
        const currentPositionY = (locationY).toFixed(precision)
        const deltaX = (currentPositionX - previousPosition.x)
        const deltaY = (currentPositionY - previousPosition.y)
        previousPosition.x = currentPositionX
        previousPosition.y = currentPositionY
        if (!isTouched) {
            isTouched = true
            return
        }
        deltaPosition.x = deltaX > 0 && deltaX < 1 ? 1 : deltaX
        deltaPosition.y = deltaY > 0 && deltaY < 1 ? 1 : deltaY
    };

    const _isTap = () => {
        const touchDuration = Date.now() - touchStartTimestamp;
        return touchStartTimestamp && (touchDuration < tapDuration) && (deltaPosition.x < tapErrorMargin && deltaPosition.y < tapErrorMargin);
    }

    const _handleTrackpadTap = () => {
        if (_isTap()) {
            if (numberOfTouches === 2)
                remoteMouseService.sendMessage(EMouseEvents.RIGHT_CLICK)
            else if (_isDoubleTap())
                remoteMouseService.sendMessage(EMouseEvents.DOUBLE_CLICK)
            else
                remoteMouseService.sendMessage(EMouseEvents.LEFT_CLICK)
        }
    }

    const _isDoubleTap = () => {
        if (doubleTapHot)
            return true;
        if (!doubleTapInterval) {
            doubleTapInterval = setInterval(() => doubleTapHot = false, doubleTapIntervalDuration)
        }
        doubleTapHot = true;
        return false;

    }


    const onStartShouldSetResponder = nativeEvent => {
        touchStartTimestamp = Date.now();
        prevMoveTouchTimestamp = nativeEvent.timestamp
        return true;
    }

    const handleTrackpadMove = nativeEvent => {
        numberOfTouches = nativeEvent.touches.length;
        if (nativeEvent.touches.length === 1) {
            _changeDeltaPosition(nativeEvent.locationX, nativeEvent.locationY);
            const velocity = _calculateVelocity(nativeEvent.timestamp)
            const scaledDeltaX = (deltaPosition.x * velocity).toFixed()
            const scaledDeltaY = (deltaPosition.y * velocity).toFixed()
            if (!drag && doubleTapHot) {
                drag = true;
            }
            const event = drag ? EMouseEvents.DRAG : EMouseEvents.MOVE
            const message = `${event} ${scaledDeltaX} ${scaledDeltaY}`
            if (deltaPosition.x || deltaPosition.y)
                remoteMouseService.sendMessage(message)
        }
    }


    const handleTouchRelease = () => {
        isTouched = false
        drag = false
        _handleTrackpadTap()
        numberOfTouches = 0;
        previousPosition.x = 0;
        previousPosition.y = 0;
    }

    return {handleTrackpadMove, handleTouchRelease, onStartShouldSetResponder}
}

export default useTrackpadHandler;