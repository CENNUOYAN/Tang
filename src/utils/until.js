/**
 * API配置文件
 */
const apiPath =
  process.env.NODE_ENV === 'production' ? 'http://120.24.237.109:8035' : ''

module.exports = {
  apiPath,
}
