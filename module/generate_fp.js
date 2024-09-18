// 收藏/取消收藏专辑

const createOption = require('../util/option.js')
const { GenerateFP } = require('../util/afp.js')
function RecorderCallback(duration, channelL) {
  let sampleBuffer = new Float32Array(channelL.subarray(0, duration * 8000))
  return GenerateFP(sampleBuffer)
}

module.exports = async (query, request) => {
  const binaryBuffer = query.file.data
  // createOption(query, 'weapi')
  const fp = await RecorderCallback(query.duration,new Float32Array(binaryBuffer.buffer, binaryBuffer.byteOffset, binaryBuffer.length / 4))
  return { status: 200, body: {"fp":fp} }
}
