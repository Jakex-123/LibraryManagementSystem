
//@ts-nocheck

import express from 'express';
import BookController from '../controllers/BookController';
import AuthController from '../controllers/AuthController';
import { AuthMiddleware, Authorize } from '../middleware/AuthMiddleware';
import TransactionController from '../controllers/TransactionController';
import UserController from '../controllers/UserController';

const router=express.Router()

router.post('/auth/signup',AuthController.signupUser)
router.post('/auth/login',AuthController.loginUser)

router.get('/book/all',AuthMiddleware,Authorize('admin'),BookController.getAllBooks)
router.get('/book/available',AuthMiddleware,BookController.getAvailableBooks)
router.get('/book/:id',BookController.getBookbyId)
router.put('/book/:id',AuthMiddleware,Authorize('admin'),BookController.updateBook)
router.post('/book',AuthMiddleware,Authorize('admin'),BookController.addBook)
router.delete('/book/:id',AuthMiddleware,Authorize('admin'),BookController.deleteBook)

router.post('/transaction/borrow',AuthMiddleware,TransactionController.borrowBook)
router.post('/transaction/return',AuthMiddleware,TransactionController.returnBook)

router.get('/user/all',AuthMiddleware,Authorize('admin'),UserController.getUsers)
router.get('/user/borrowed',AuthMiddleware,UserController.getUsersWithBooks)


export default router