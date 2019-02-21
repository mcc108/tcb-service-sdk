const config = require('./config')
const {
  AppID,
  AppKey
} = config
const cloud = require('wx-server-sdk')
cloud.init()
const TcbService = require('tcb-service-sdk')
const tcbService = new TcbService({ SecretID: AppID, SecretKey: AppKey })

exports.main = async (event, context) => {
  let {
    fileID = '',
    contentType = 'mp3'
  } = event

  if (!fileID) {
    response.code = 10003
    response.message = 'fileID 不能为空'
    return response
  }

  let response = {
    code: 0,
    data: {},
    message: 'success'
  }

  try {
    let fileResult = await cloud.downloadFile({
      fileID,
    })

    if (fileResult.fileContent) {
      let result = await tcbService.callService({
        service: 'sms',
        action: 'VoiceFileUpload',
        data: {
          fileContent: fileResult.fileContent,
          contentType
        }
      })

      response = result
    }
    else {
      response.code = 10004
      response.message = '获取文件内容失败'
      return response
    }
  }
  catch (e) {
    response.code = e.code || 10002
    response.message = e.message
  }

  return response
}