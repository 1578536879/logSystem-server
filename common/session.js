const DB = require('../db')

let clearSessionId = function(){
    setInterval(async function(){
        let nowTime = new Date()
        nowTime = nowTime.getTime()
        let intervalTime = 30 * 60 * 1000
        if(DB.getDB()){
            let sessionIds =await DB.getDB().collection('sessionIDs').find().toArray()
            
            sessionIds.forEach(ele=>{
                if(nowTime - ele.time > intervalTime) {
                    DB.getDB().collection('sessionIDs').deleteOne(ele)
                }
            })
        }
    }, 60000)
}

let online = async function(sessionId){
    let result = await DB.getDB().collection('sessionIDs').find({sessionID: sessionId}).toArray()
    if(result.length === 0) {
        return false
    }else {
        return true
    }
}

let updateTime = async function(sessionId){
    let time = new Date()
    time = time.getTime()
    let result = await DB.getDB().collection('sessionIDs').updateOne({
        sessionID: sessionId
    },{
        $set: {time: time}
    })
    // console.log(123)
}

module.exports = {
    clearSessionId: clearSessionId,
    online: online,
    updateTime: updateTime
}