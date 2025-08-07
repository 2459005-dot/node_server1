const express = require("express")
const router = express.Router()

let Character = require('../models/characterModel')

router.post('/', async (req, res) => {
    try {
        const { name, level, isOnline } = req.body
        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: '이름과 레벨은 필수입력' })
        }
        const newChar = new Character({
            name,
            level,
            isOnline: isOnline ?? false
        })

        const saveChar = await newChar.save()
        res.status(200).json({ message: '캐릭터 추가 성공', character: saveChar })
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error })
    }
})

router.get('/', async (req, res) => {
    try {
        const characters = await Character.find()

        res.status(200).json({ message: '캐릭터 전체 조회', characters })
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const charId = req.params.id

        const character = await Character.findById(charId)

        if (!character) {
            res.status(404).json({ message: '캐릭터 없음' })
        }

        res.status(200).json({ message: '캐릭터 조회', character })
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { name, level, isOnline } = req.body
        if (!name || typeof level !== 'number') {
            return res.status(400).json({ message: '이름과 레벨은 필수입력' })
        }
        const updateChar = await Character.findByIdAndUpdate(
            req.params.id,
            {
                name,
                level,
                isOnline
            },
            {
                new: true,
                runValidators: true
            })
        if (!updateChar) {
            res.status(404).json({ message: '캐릭터 없음' })
        }
        res.status(200).json({ message: '캐릭터 수정', character: updateChar })
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const charId = req.params.id

        const character = await Character.findByIdAndDelete(charId)

        if (!character) {
            res.status(404).json({ message: '캐릭터 없음' })
        }
        
        res.status(200).json({ message: '캐릭터 삭제', character })
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error })
    }
})

module.exports = router;