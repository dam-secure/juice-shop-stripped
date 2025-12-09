// from https://github.com/sindresorhus/is-heroku/tree/main MIT Licensed


export default () => 'HEROKU' in process.env || ('DYNO' in process.env && process.env.HOME === '/app')
