const NODE_ENV = 'production';

const URI_BBT_API = NODE_ENV === 'production' ? 'http://bbtdiary-env.eba-ea8tzmrw.ap-southeast-1.elasticbeanstalk.com' : 'localhost:8000';
const PREFIX_BBT_API = '/api/bbts/';

export const URL_BBT_API = URI_BBT_API + PREFIX_BBT_API;