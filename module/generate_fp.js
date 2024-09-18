// 生成音频指纹

const createOption = require('../util/option.js')
const { GenerateFP } = require('../util/afp.js')
function RecorderCallback(duration, channelL) {
  let sampleBuffer = new Float32Array(channelL.subarray(0, duration * 8000))
  return GenerateFP(sampleBuffer)
}

module.exports = async (query, request) => {
  const binaryBuffer = query.file.data
  // 将 Buffer 转换为 ArrayBuffer
  const float32Array = binaryBuffer.buffer.slice(
    binaryBuffer.byteOffset,
    binaryBuffer.byteOffset + binaryBuffer.byteLength,
  )

  // 将 ArrayBuffer 转换为 Float32Array
  let channelL = new Float32Array(float32Array)
  const fp = await RecorderCallback(query.duration, channelL)
  return { status: 200, body: { fp: fp } }
}
