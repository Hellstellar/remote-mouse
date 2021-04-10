const useTrackpadHandler = (remoteMouseService) => {
    let prevPositionX = 0;
    let prevPositionY = 0;
    let isTouched = false

    const getDeltaPositionXY = ({locationX, locationY}) => {
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


    const handleTrackpadTouch = nativeEvent => {
        const [deltaX, deltaY] = getDeltaPositionXY(nativeEvent);
        const location = `MOVE ${deltaX} ${deltaY}`
        if(deltaX && deltaY)
            remoteMouseService.sendMessage(location)
    }

    const handleTouchRelease = () => {
        isTouched = false
        prevPositionX = 0;
        prevPositionY = 0;
    }

    return {handleTrackpadTouch, handleTouchRelease}
}

export default useTrackpadHandler;