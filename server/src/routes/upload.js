import Router from 'koa-router';
import multer from '@koa/multer';

import { makePath } from '../../../nest/src/utils/path';
import { uploadFiles } from './upload-files';

const post = (uploadFolder, dataFolder) => async (ctx) => {
  const path = makePath(ctx.params.path);
  const files = ctx.request.files;
  try {
    const result = await uploadFiles(uploadFolder, dataFolder, files);
    ctx.body = result;
  } catch (e) {
    ctx.throw(404, `invalid path: ${path}`);
  }
};

export default function createRouter(config) {
  const { uploadFolder, dataFolder } = config;
  const upload = multer({ dest: uploadFolder });

  const router = new Router();
  router.post('/:path', upload.array('file'), post(uploadFolder, dataFolder));
  return router;
}
