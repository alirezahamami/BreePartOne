import { Router } from 'express';
import { getScreenUser } from '../controllers/screenUserController.';

const router = Router();

router.post('/SSA', getScreenUser);

export default router;
