const { getValueFromRedisByKey, setValuesToRedis, getValueFromRedisAWSByKey, setValuesToRedisAWS } = require("../config/redisConfig")


exports.saveChildDeviceIdToRedis = async (socket, roomName) => {
    let deviceId = socket.handshake.query.deviceId; // get deviceId from socket handshake query
    let childId = socket.handshake.query.childId; // get childId from socket handshake query
    let deviceName = socket.handshake.query.deviceName; // get deviceName from socket handshake query
    if (!childId || !deviceId) { // check if childId and deviceId are present
        throw "DeviceId and childId is required" // throw error if either childId or deviceId is missing
    }
    /**
     * @type {Array}
     */
    let deviceList = await getValueFromRedisAWSByKey(roomName) // get deviceList from Redis using roomName
    if (socket.handshake.query.type == "child") { // check if socket type is child
        if (deviceList) { // check if deviceList is present in Redis
            deviceList = JSON.parse(deviceList) // parse deviceList from Redis
        } else {
            deviceList = [] // set deviceList to empty array if not present in Redis
        }
        let childData = deviceList.findIndex(item => item.childId == childId) // find index of childData in deviceList
        if (childData < 0) { // if childData is not in Redis
            deviceList.push({ // push new childData to deviceList
                childId,
                deviceList: [{ deviceId, deviceName }]
            })
            await setValuesToRedisAWS(roomName, deviceList) // set updated deviceList to Redis
        } else {
            if (!deviceList[childData].deviceList.find(item => item.deviceId == deviceId)) { // if current device is not present in Redis
                deviceList[childData].deviceList = [...deviceList[childData].deviceList, { deviceId, deviceName }] // add current device to deviceList
                await setValuesToRedisAWS(roomName, deviceList) // set updated deviceList to Redis
            }
        }
    }
    return deviceList // return updated deviceList
}

exports.saveParentDeviceIdToRedis = async (socket, roomName) => {
    roomName = roomName + "_parent"
    let deviceId = socket.handshake.query.deviceId;
    /**
     * @type {Array}
     */
    let deviceList = await getValueFromRedisAWSByKey(roomName)
    if (socket.handshake.query.type == "parent") {
        if (deviceList) {
            deviceList = JSON.parse(deviceList)
        } else {
            deviceList = []
        }
        if (!deviceList.find(item => item == deviceId)) {
            deviceList.push(socket.handshake.query.deviceId)
            await setValuesToRedisAWS(roomName, deviceList)
        }
    }
    return deviceList
}


exports.removeChildDeviceIdFromRedis = async (socket, roomName) => {
    let deviceId = socket.handshake.query.deviceId;
    let childId = socket.handshake.query.childId;
    /**
     * @type {Array}
     */
    let deviceList = await getValueFromRedisAWSByKey(roomName)
    if (socket.handshake.query.type == "child") {
        if (deviceList) {
            deviceList = JSON.parse(deviceList)
        } else {
            deviceList = []
        }
        let childData = deviceList.findIndex(item => item.childId == childId)
        if (childData > -1) {
            if (deviceList[childData].deviceList.find(item => item.deviceId == deviceId)) {
                const index = deviceList[childData].deviceList.findIndex(item => item.deviceId == deviceId);
                if (index > -1) { // only splice array when item is found
                    deviceList[childData].deviceList.splice(index, 1); // 2nd parameter means remove one item only
                }
                await setValuesToRedisAWS(roomName, deviceList)
            }
        }
    }
    return deviceList
}

exports.removeParentDeviceIdFromRedis = async (socket, roomName) => {
    roomName = roomName + "_parent"
    let deviceId = socket.handshake.query.deviceId;
    /**
     * @type {Array}
     */
    let deviceList = await getValueFromRedisAWSByKey(roomName)
    if (socket.handshake.query.type == "parent") {
        if (deviceList) {
            deviceList = JSON.parse(deviceList)
        } else {
            deviceList = []
        }
        if (deviceList.find(item => item == deviceId)) {
            const index = deviceList.indexOf(deviceId);
            if (index > -1) { // only splice array when item is found
                deviceList.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        await setValuesToRedisAWS(roomName, deviceList)
    }
    return deviceList
}

exports.getChildDeviceListFromRedis = async (roomName) => {
    let deviceList = await getValueFromRedisAWSByKey(roomName)
    if (deviceList) {
        deviceList = JSON.parse(deviceList)
    } else {
        deviceList = []
    }
    return deviceList
}
exports.getParentDeviceListFromRedis = async (roomName) => {
    roomName = roomName + "_parent"
    let deviceList = await getValueFromRedisAWSByKey(roomName)
    if (deviceList) {
        deviceList = JSON.parse(deviceList)
    } else {
        deviceList = []
    }
    return deviceList
}