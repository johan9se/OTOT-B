const NODE_ENV = 'production';

const URI_BBT_API = NODE_ENV === 'production' ? 'http://bbtdiary-env.eba-ea8tzmrw.ap-southeast-1.elasticbeanstalk.com' : 'http://localhost:8000';
const PREFIX_BBT_API = '/api/bbts/';
export const URL_BBT_API = URI_BBT_API + PREFIX_BBT_API;

export const SERVERLESS_CONVERTER = 'https://5tdjifm5hpwmeohaqukae5mcj40gxbde.lambda-url.ap-southeast-1.on.aws/';