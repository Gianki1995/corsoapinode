import express from 'express'
import { insertUser, getAllUsers, getUserByID, deleteUser, updateUser } from '../controllers/users.js'


const router = express.Router();

// router

router.get('/', getAllUsers)

router.post('/', insertUser)

router.get('/:id', getUserByID)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

export default router