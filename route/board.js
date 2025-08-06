const express = require("express")
const router = express.Router()

let boards = require('../models/boardModel')
const Board = require("../models/boardModel")

router.get('/', (req, res) => {
    try {
        res.status(200).json({ message: '전체 게시물 가져오기', boards })
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error })
    }
})

router.get('/:id', (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const board = boards.find(b => b.id === boardId)
        if (!board) {
            return res.status(404).json({ message: '사용자 없음' })
        }
        return res.status(200).json({
            message: '게시물 가져오기',
            board
        })
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error })
    }
})

router.post('/',(req,res)=>{
    try {
        const {title, content} = req.body
        if(!title || !content){{
            return res.status(400).json({message:'제목과 내용을 모두 입력하기'})
        }}
        const newBoard = {
            id:Date.now(),
            title,
            content
        }
        boards.push(newBoard)
        res.status(200).json({message:'게시물 추가',boards})
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error })
    }
})

router.put('/:id', (req, res) => {
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)
        if (index===-1) {
            return res.status(404).json({ message: '사용자 없음' })
        }
        const updateBoard = req.body
        boards[index] = {
            ...boards[index],
            ...updateBoard
        }
        res.status(200).json({message: '게시물 수정', boards:boards[index]
        })
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error })
    }
})

router.delete('/:id',(req,res)=>{
    try {
        const boardId = Number(req.params.id)
        const index = boards.findIndex(b => b.id === boardId)
        if (index===-1) {
            return res.status(404).json({ message: '사용자 없음' })
        }
        boards.splice(index,1)
        res.status(200).json({message: '게시물 삭제', boards})
    } catch (error) {
        res.status(500).json({ message: "서버 오류", error })
    }
})
module.exports = router